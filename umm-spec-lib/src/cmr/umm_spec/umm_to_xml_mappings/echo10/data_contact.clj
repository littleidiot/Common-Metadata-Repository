(ns cmr.umm-spec.umm-to-xml-mappings.echo10.data-contact
  "Functions for generating ECHO10 XML contact elements from UMM data centers and contact persons."
  (:require [cmr.umm-spec.util :as u]
            [clojure.string :as str]))

(def umm-data-center-role->echo10-contact-organization-role
 {"ARCHIVER" "ARCHIVER"
  "DISTRIBUTOR" "DISTRIBUTOR"
  "ORIGINATOR" "Data Originator"
  "PROCESSOR" "PROCESSOR"})

;; ECHO10 has email and phone contact mechanisms. UMM Email goes to ECHO10 email. Facebook and Twitter
;; contact mechanisms are dropped. Everything else is considered phone.
(def echo10-non-phone-contact-mechanisms
 #{"Email" "Twitter" "Facebook"})

(defn join-street-addresses
  "UMM has multiple street addresses and ECHO10 has 1, so join the street addresses in UMM street
  addresses into 1 street address string"
  [street-addresses]
  (str/join " " street-addresses))

(defn- generate-emails
  "Returns ECHO10 organization contact emails from the UMM contact information contact mechanisms"
  [contact-information]
  (let [emails (filter #(= "Email" (:Type %)) (:ContactMechanisms contact-information))]
    (when (seq emails)
      [:OrganizationEmails
       (for [email emails]
         [:Email (:Value email)])])))

(defn- generate-phones
  "Returns ECHO10 organization contact phones from the UMM contact information contact mechanisms"
  [contact-information]
  (let [phones (remove #(contains? echo10-non-phone-contact-mechanisms (:Type %)) (:ContactMechanisms contact-information))]
    (when (seq phones)
      [:OrganizationPhones
       (for [phone phones]
         [:Phone
          [:Number (:Value phone)]
          [:Type (:Type phone)]])])))

(defn- generate-addresses
  "Returns ECHO10 organization contact addresses from the UMM contact information contact mechanisms"
  [contact-information]
  (let [addresses (:Addresses contact-information)]
    (when (seq addresses)
      [:OrganizationAddresses
        (for [address addresses]
          [:Address
            [:StreetAddress (join-street-addresses (:StreetAddresses address))]
            [:City (:City address)]
            [:StateProvince (:StateProvince address)]
            [:PostalCode (:PostalCode address)]
            [:Country (:Country address)]])])))

(defn- generate-organization-contacts
  "Returns the ECHO10 Contact elements from the given UMM collection data centers."
  [c]
  (let [data-centers (if (seq (:DataCenters c))
                       (:DataCenters c)
                       [u/not-provided-data-center])]
    (for [center data-centers
          :let [contact-information (:ContactInformation center)]]
      [:Contact
       [:Role (first (map #(get umm-data-center-role->echo10-contact-organization-role %)
                       (:Roles center)))]
       [:HoursOfService (:ServiceHours contact-information)]
       [:Instructions (:ContactInstruction contact-information)]
       [:OrganizationName (:ShortName center)]
       ;[:OrganizationName (:LongName center)]])))
       (generate-addresses contact-information)
       (generate-phones contact-information)
       (generate-emails contact-information)])))

(defn generate-contacts
  "Returns the ECHO10 Contact elements from the given UMM"
  [c]
  [:Contacts
   (generate-organization-contacts c)])
   ;; TO DO: Generate persons
