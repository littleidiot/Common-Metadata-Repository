(ns cmr.common-app.test.services.kms-lookup
  "Unit tests for KMS lookup namespace."
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer :all]
   [cmr.transmit.kms :as kms]
   [cmr.common-app.services.kms-lookup :as kms-lookup]
   [cmr.common.util :refer [are3]]))

; (defn- load-all-kms-keywords
;   "Loads all of the KMS keywords from the example KMS files."
;   []
;   (into {}
;         (for [keyword-scheme (keys kms/keyword-scheme->gcmd-resource-name)
;               :let [filename (format "kms_examples/%s"
;                                      (kms/keyword-scheme->gcmd-resource-name keyword-scheme))
;                     kms-keywords-csv (-> filename io/resource slurp)]]
;           [keyword-scheme (#'kms/parse-entries-from-csv keyword-scheme kms-keywords-csv)])))
;
; (defn- sort-of-deflate-sample
;   "TODO"
;   []
;   (into {}
;         (for [[k v] (load-all-kms-keywords)]
;           [k [(first (vals v))]])))
;
; (defn- sort-of-deflate
;   "TODO"
;   []
;   (into {}
;         (for [[k v] (load-all-kms-keywords)]
;           [k (vals v)])))
;
; (comment
;  (sort-of-deflate)
;
;  {:spatial-keywords {:location-strings {"a location" {:category "a" :type "OTHER"}}}})

(def sample-map
  "Sample GCMD keywords map to use for all of the tests"
  {:providers [{:level-0 "ACADEMIC" :level-1 "OR-STATE/EOARC" :short-name "PROV1"
                :long-name "Eastern Oregon Agriculture Research Center, Oregon State University"
                :uuid "prov1-uuid"}]
   :platforms [{:short-name "PLAT1" :long-name "Platform 1" :other-random-key 7 :uuid "plat1-uuid"}]
   :instruments [{:short-name "INST1" :long-name "Instrument 1" :uuid "inst1-uuid"}]
   :projects [{:short-name "PROJ1" :long-name "Project 1" :uuid "proj1-uuid"}]
   :spatial-keywords [{:category "CONTINENT" :type "AFRICA" :subregion-1 "CENTRAL AFRICA"
                       :subregion-2 "CHAD" :subregion-3 "AOUZOU" :uuid "location1-uuid"}
                      {:category "CONTINENT" :type "AFRICA" :uuid "location2-uuid"}
                      {:category "CONTINENT" :type "AFRICA" :subregion-1 "CENTRAL AFRICA"
                       :uuid "location3-uuid"}
                      {:category "CONTINENT" :type "EUROPE" :subregion-1 "BLACK SEA"
                       :uuid "location4-uuid"}
                      {:category "SPACE" :uuid "location5-uuid"}
                      {:category "CONTINENT" :type "UNITED STATES" :subregion-1 "GEORGIA"
                       :uuid "location6-uuid"}]
   :science-keywords [{:category "EARTH SCIENCE" :topic "TOPIC1" :term "TERM1"
                       :variable-level-1 "VL1" :variable-level-2 "VL2"
                       :variable-level-3 "VL3" :uuid "sk1-uuid"}]})

(def kms-index
  "KMS index to use for all of the tests which creates the KMS index from the sample map."
  (kms-lookup/create-kms-index sample-map))

(deftest roundtrip-inflate-and-deflate-index-test
  (is (= sample-map (kms-lookup/deflate (kms-lookup/create-kms-index sample-map)))))

(deftest lookup-by-location-string-test
  (testing "Full location hierarchy is returned"
    (is (= {:category "CONTINENT" :type "AFRICA" :subregion-1 "CENTRAL AFRICA"
            :subregion-2 "CHAD" :subregion-3 "AOUZOU" :uuid "location1-uuid"}
           (kms-lookup/lookup-by-location-string kms-index "AOUZOU"))))

  (are3 [location-string expected-uuid]
    (is (= expected-uuid (:uuid (kms-lookup/lookup-by-location-string kms-index location-string))))

    "Fewest number of hierarchical keys are returned"
    "CENTRAL AFRICA" "location3-uuid"

    "Lookups are case insensitive"
    "cENtRAl aFRiCA" "location3-uuid"

    "Not found returns nil"
    "cha" nil

    "Duplicate maps are used to override default location choice - SPACE"
    "SPACE" "6f2c3b1f-acae-4af0-a759-f0d57ccfc83f"

    "Duplicate maps are used to override default location choice - BLACK SEA"
    "BLACK SEA" "afbc0a01-742e-49da-939e-3eaa3cf431b0"

    "Duplicate maps are used to override default location choice - GEORGIA"
    "GEORGIA" "d79e134c-a4d0-44f2-9706-cad2b59de992"))

;; TODO what about providers?
(deftest lookup-by-umm-c-keyword-test
  (testing "Full keyword map is returned by umm-c lookup"
    (is (= {:short-name "PLAT1" :long-name "Platform 1" :other-random-key 7 :uuid "plat1-uuid"}
           (kms-lookup/lookup-by-umm-c-keyword kms-index :platforms
                                               {:short-name "Plat1" :long-name "Platform 1"}))))
  ;; Test each of the different keywords with fields present and missing
  (are3 [keyword-scheme umm-c-keyword expected-uuid]
    (is (= expected-uuid
           (:uuid (kms-lookup/lookup-by-umm-c-keyword kms-index keyword-scheme umm-c-keyword))))

    "Lookup Platform"
    :platforms {:short-name "PLAT1" :long-name "Platform 1"} "plat1-uuid"

    "Lookups are case insensitive"
    :platforms {:short-name "plAt1" :long-name "PLATFORm 1"} "plat1-uuid"

    "Lookup without all keys used in the lookup returns nil"
    :platforms {:short-name "PLAT1"} nil

    "Lookup platform with extra keys finds the platform"
    :platforms {:a-key "a" :b-key "b" :short-name "PLAT1" :long-name "Platform 1"} "plat1-uuid"

    "Lookup Instrument"
    :instruments {:short-name "inst1" :long-name "Instrument 1"} "inst1-uuid"

    "Lookup science keyword"
    :science-keywords {:category "EARTH SCIENCE" :topic "TOPIC1" :term "TERM1"
                       :variable-level-1 "VL1" :variable-level-2 "VL2"
                       :variable-level-3 "VL3" :detailed-variable "detailed"} "sk1-uuid"

    "Lookup project"
    :projects {:short-name "proj1" :long-name "Project 1"} "proj1-uuid"

    "Lookup spatial keyword"
    :spatial-keywords {:category "CONTINENT" :type "AFRICA" :subregion-1 "CENTRAL AFRICA"
                       :subregion-2 "CHAD" :subregion-3 "AOUZOU"} "location1-uuid"

    "Lookup works without all matching fields present"
    :spatial-keywords {:category "CONTINENT" :type "AFRICA"} "location2-uuid"))

(deftest lookup-by-short-name-test
  (testing "Full keyword map is returned by short-name lookup"
    (is (= {:short-name "PLAT1" :long-name "Platform 1" :other-random-key 7 :uuid "plat1-uuid"}
           (kms-lookup/lookup-by-short-name kms-index :platforms "PLAT1"))))
  ;; Test each of the different keywords with fields present and missing
  (are3 [keyword-scheme short-name expected-uuid]
    (is (= expected-uuid
           (:uuid (kms-lookup/lookup-by-short-name kms-index keyword-scheme short-name))))

    "Lookup Platform"
    :platforms "PLAT1" "plat1-uuid"

    "Lookups are case insensitive"
    :platforms "plAt1" "plat1-uuid"

    "Lookup Provider"
    :providers "PROV1" "prov1-uuid"

    "Lookup Instrument"
    :instruments "INST1" "inst1-uuid"

    "Lookup returns nil for no match in another keyword scheme"
    :platforms "INST1" nil))
