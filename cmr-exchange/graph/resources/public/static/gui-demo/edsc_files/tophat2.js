var DAAC_LINKS=[{text:"ASDC",title:"Atmospheric Science Data Center (ASDC)",link:"https://eosweb.larc.nasa.gov/"},{text:"ASF DAAC",title:"Alaska Satellite Facility (ASF) Distributed Active Archive Center (DAAC)",link:"https://www.asf.alaska.edu/"},{text:"CDDIS",title:"Crustal Dynamics Data Information System (CDDIS)",link:"http://cddis.gsfc.nasa.gov/"},{text:"GES DISC",title:"Goddard Earth Sciences Data and Information Services Center (GES DISC)",link:"http://disc.sci.gsfc.nasa.gov/"},{text:"GHRC DAAC",
title:"Global Hydrology Resource Center (GHRC) Distributed Active Archive Center (DAAC)",link:"https://ghrc.nsstc.nasa.gov/home/"},{text:"LAADS DAAC",title:"Level 1 Atmosphere Archive and Distribution System (LAADS) Distributed Active Archive Center (DAAC)",link:"https://ladsweb.modaps.eosdis.nasa.gov/"},{text:"LP DAAC",title:"Land Processes Distributed Active Archive Center (LP DAAC)",link:"https://lpdaac.usgs.gov/"},{text:"NSIDC DAAC",title:"National Snow and Ice Data Center (NSIDC) Distributed Active Archive Center (DAAC)",
link:"http://nsidc.org/daac/"},{text:"OB.DAAC",title:"Ocean Biology Distributed Active Archive Center (OB.DAAC)",link:"https://oceancolor.gsfc.nasa.gov/"},{text:"ORNL DAAC",title:"Oak Ridge National Laboratory (ORNL) Distributed Active Archive Center (DAAC)",link:"http://daac.ornl.gov/"},{text:"PO.DAAC",title:"Physical Oceanography Distributed Active Archive Center (PO.DAAC)",link:"http://podaac.jpl.nasa.gov/"},{text:"SEDAC",title:"Socioeconomic Data and Applications Data Center (SEDAC)",link:"http://sedac.ciesin.columbia.edu/"}],
STATUS_API_URL="//status.earthdata.nasa.gov/api/v1/notifications";(function(){function p(a){a.Category="Tophat";a.Domain=window.location.hostname;if("function"==typeof ntptEventTag){for(var m in a)ntptAddPair(m,a[m]);ntptEventTag("lc="+window.location)}}var s=document.getElementById("earthdata-tophat-script").src,g=s.replace(/tophat2\.js/,"tophat2.css"),s=s.substr(0,s.lastIndexOf("/"));if("undefined"==typeof ntptEventTag){var w=document.createElement("script");w.setAttribute("src",s+"/ntpagetag.js");document.head.appendChild(w)}g=["https://fonts.googleapis.com/css?family=Open+Sans:400,700,300",
"https://cdn.earthdata.nasa.gov/eui/1.0.6/eui-icon-library.css",g];"false"!==document.getElementById("earthdata-tophat-script").getAttribute("data-use-fontawesome")&&g.push("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");g.forEach(function(a){var m=document.createElement("link");m.href=a;m.rel="stylesheet";m.type="text/css";document.head.appendChild(m)});g=document.createElement("script");g.setAttribute("src","https://cdn.earthdata.nasa.gov/elibs/jquery/2.1.3/jquery-2.1.3.min.js");
document.head.appendChild(g);g.addEventListener("load",function(){(function(a){var m=function(b,m){var e,x,g,f,t,k,l,q,n,r,u=[],v={},p={type:"empty",sortKey:"a",message:"No notifications available.",id:"0",updated_at:"0"},d={showStatusPanel:!1,showFeedbackPanel:!1,daacLinks:[],currentDaac:null,fbmSubjectLine:null,statusPollingInterval:0,minimumStatusPollingInterval:10,statusApiUrl:"",useFontAwesome:!0},s={outage:"a",alert:"b",message:"c"};"object"===typeof b&&(a.extend(d,m),0!==d.statusPollingInterval&&
d.statusPollingInterval<d.minimumStatuspollingInterval&&(d.statusPollingInterval=d.minimumStatuspollingInterval));this.addStatusEntry=function(a){100>u.length&&(u.push(a),v[a.id]={},v[a.id].seen=!1,v[a.id].updated_at=a.updated_at);var c=z();c.hasOwnProperty(a.id)&&!0==c[a.id].seen&&(v[a.id].seen=v[a.id].updated_at!==c[a.id].updated_at?!1:!0)};this.showStatusEntries=function(){a(f).empty();u=u.sort(function(a,c){return a.sortKey>c.sortKey?1:a.sortKey<c.sortKey?-1:0});a(".th-entry-div").hasClass("th-empty")||
a.each(u,function(h,c){var b=a("<div>").addClass("th-entry-div"),d;if("empty"===c.type)a(b).addClass("th-"+c.type),d=c.message;else{var B=a("<div>").addClass("th-left").addClass("th-"+c.type);a(B).addClass("th-"+c.type);d="<b>"+c.type+"</b>: "+c.message;a(b).append(B)}d=a("<div>").addClass("th-right").html(d);a(b).append(d);a(f).append(b)})};this.init=function(){k=a("<header>").attr("id","earthdata-tophat2");var h=a("<div>").attr("class","th-wrapper"),c=a("<div>").addClass("th-left-section"),e=a("<div>").attr("class",
"th-left-title").html("<a href='https://earthdata.nasa.gov/' id='th-home-link'>EARTH<b>DATA</b></a>");a(k).append(c);a(c).append(e);C();D();E();F();a("#earthdata-tophat2").remove();a(b).prepend(k);this.showStatusEntries();G(q,f,void 0,g);sessionStorage&&(null===sessionStorage.getItem("statusChecked")?sessionStorage.setItem("statusChecked","false"):sessionStorage.getItem("statusChecked"));d.showStatusPanel&&(A(),0<d.statusPollingInterval&&setInterval(function(){A()},6E4*d.statusPollingInterval));a(k).wrap(h);
return k};var w=function(){var h=parseInt(sessionStorage.getItem("unreadNotifs"));0<h?(a(n).text(h),a(n).css("visibility","visible"),9<h?a(n).addClass("th-notif-pill"):a(n).removeClass("th-notif-pill")):a(n).css("visibility","hidden")},H=function(){var h=a(l).closest(".th-link-container");a(".th-menu-panel").not(q).hide();a(".th-link-container").not(h).removeClass("th-active-cell");a(q).is(":visible")?(a(q).hide(),a(l).closest(".th-link-container").removeClass("th-active-cell")):(a(q).show(),a(l).closest(".th-link-container").addClass("th-active-cell"))},
y=function(h,c){var b=a(h).closest(".th-link-container");a(".th-menu-panel").not(c).hide();a(".th-link-container").not(b).removeClass("th-active-cell");a(c).is(":visible")?(a(c).hide(),a(h).closest(".th-link-container").removeClass("th-active-cell")):(a(c).show(),a(h).closest(".th-link-container").not(".th-fbm-link-container").addClass("th-active-cell"));if(a(c).hasClass("th-status-panel"))if(a(c).is(":visible")?a(r).css("position","static"):a(r).css("position","relative"),a(n).css("visibility","hidden"),
sessionStorage&&(sessionStorage.setItem("statusChecked","true"),sessionStorage.setItem("unreadNotifs",0),b=z(),a.each(b,function(a,b){b.seen=!0}),sessionStorage.setItem("seenEntries",JSON.stringify(b))),6<u.length){a(f).addClass("th-scrolled");var d=0;a(f).find(".th-entry-div:lt(6)").each(function(){d+=a(this).height()});a(f).css("th-height",d+"px")}else a(f).removeClass("th-scrolled"),a(f).css("th-height","")},G=function(){a.each(arguments,function(b,c){a(document).click(function(b){0<!a(b.target).closest(k).length&&
(a(c).hide(),a(".th-link-container").removeClass("th-active-cell"),a(r).css("position","relative"))})})},F=function(){var b=a("<div>").addClass("th-link-container th-menu-section"),c;c=null===d.currentDaac?"Find a DAAC":"Other DAACs";l=a("<a>").attr({href:"javascript:void(0);",id:"daac-links-header"}).html(c).click(H);c=a("<span>").attr("class","th-arrow").html("&#x25BE");a(l).append(c);a(b).append(l);q=a("<div>").addClass("th-menu-panel th-daac-links");var e=a("<ul>");a.each(d.daacLinks,function(b,
c){var h=c.text;c.text===d.currentDaac&&(h="<b>"+c.text+"</b>");var h=a("<a>").attr("title",c.title).attr("href",c.link).attr("target","_blank").html(h),f=a("<li>");a(f).append(h);a(e).append(f)});a(q).append(e);a(l).append(q);a(k).append(b)},E=function(){!1!==d.showStatusPanel&&(t=a("<a>").attr("href","javascript:void(0);").addClass("th-right-panel-link").addClass("th-status-link").click(function(){y(t,f)}),a(t).prepend(a("<i>").addClass("fa fa-bell")),n=a("<span>").addClass("th-notif-circle").text("0").css("visibility",
"hidden").click(function(){y(t,f)}),f=a("<div>").addClass("th-menu-panel th-status-panel"),r=a("<div>").addClass("th-link-container th-status-link-container").attr("id","th-status-link"),a(t).append(f),a(r).append(t),a(r).append(n),a(k).append(r))},D=function(){if(!1!==d.showFeedbackPanel){e=a("<a>").attr("href","javascript:void(0);").attr("id","th-fbm-link").addClass("th-right-panel-link th-fbm-link").html("<span class='th-feedback-text'>Feedback</span>").click(function(){y(e,void 0);window.feedback.showForm(d.fbmSubjectLine?
{subject:d.fbmSubjectLine}:void 0)});a(e).prepend(a("<i>").addClass("fa fa-comments-o"));var b=a("<div>").addClass("th-link-container th-fbm-link-container");a(b).append(e);a(k).append(b)}},C=function(){x=a("<a>").attr("href","javascript:void(0);").attr("id","th-help-link").addClass("th-right-panel-link").click(function(){y(x,g)});a(x).prepend(a("<i>").addClass("fa fa-question-circle"));g=a("<div>").addClass("th-menu-panel th-help-panel");var b="<span><b>Welcome to NASA's EOSDIS</b></span><p>NASA's Earth Observing System Data and Information System (EOSDIS) is a key core capability in NASA\u2019s Earth Science Data Systems Program for archiving and distributing Earth science data from multiple missions to users. </p> <p>This bar indicates that you are within the EOSDIS enterprise which includes 12 science discipline-oriented Distributed Active Archive Centers (DAACs) supporting diverse user communities in science research, applied science research, applications, as well as the general interested public.</p> <p><b>Find a DAAC / Other DAACs</b> - Use these links to navigate to any of the 12 EOSDIS DAACs.";
d.showStatusPanel&&(b+=" <p><i class='fa fa-bell'></i> - View important messages and information about EOSDIS sites.</p>");d.showFeedbackPanel&&(b+=" <p><i class='fa fa-comments-o'></i> Feedback - Provide feedback about the site that is currently being viewed. </p>");a(g).append(a("<div>").addClass("th-help-panel-content").html(b));a(x).append(g);b=a("<div>").addClass("th-link-container th-help-link-container");a(b).append(x);a(k).append(b)},z=function(){var a=sessionStorage.getItem("seenEntries");
return a=null===a?{}:JSON.parse(a)},A=function(){if(!a(f).is(":visible")){var b=0;a(f).empty();a.ajax(d.statusApiUrl+"?domain="+document.location.origin).success(function(c){u=[];z();var d=0;a.each(c.notifications,function(c,e){var f=!1;if(e.path){var g=e.path.trim();1<g.length&&0===document.location.pathname.indexOf(g)&&(f=!0)}else f=!0;f&&(d++,f={type:e.notification_type,sortKey:s[e.notification_type],message:e.message,id:e.id,updated_at:e.updated_at},a(k).tophat("addStatusEntry",f),!1==v[f.id].seen&&
b++)});sessionStorage.setItem("unreadNotifs",b);sessionStorage.setItem("seenEntries",JSON.stringify(v));0<b&&sessionStorage.setItem("statusChecked",!1);1>d&&(u=[],a(k).tophat("addStatusEntry",p));w()}).error(function(b){u=[];a(k).tophat("addStatusEntry",p);sessionStorage.setItem("unreadNotifs",0);console.error("ERROR - could not retrieve notifications REASON: ",b);w()})}};this.getNotifs=function(){A()}};a.fn.tophat=function(b,g){var e=a(this).data("instance");if("undefined"===typeof e){var e=new m(this,
b),p=e.init();a(p).data("instance",e)}else"string"===typeof b&&("addStatusEntry"===b?(e.addStatusEntry(g),e.showStatusEntries()):"showStatusEntries"===b?e.showStatusEntries():"getNotifs"===b&&e.getNotifs())};a(document).ready(function(){var b=document.getElementById("earthdata-tophat-script"),g=b.getAttribute("data-current-daac"),e=b.getAttribute("data-show-fbm"),m=b.getAttribute("data-show-status"),s=b.getAttribute("data-status-polling-interval"),f=b.getAttribute("data-status-api-url"),t=b.getAttribute("data-fbm-subject-line"),
k=b.getAttribute("data-layout"),l=b.getAttribute("data-width"),b={daacLinks:DAAC_LINKS};null!==g&&(b.currentDaac=g);"true"===e&&(b.showFeedbackPanel=!0);"true"===m&&(b.showStatusPanel=!0);null!==s&&(floatInterval=parseFloat(s),isNaN(floatInterval)||Number.isNaN(floatInterval)||0===floatInterval?b.statusPollingInterval=0:b.statusPollingInterval=floatInterval);null!==f&&(STATUS_API_URL=f);null!==t&&(b.fbmSubjectLine=t);b.statusApiUrl=STATUS_API_URL;a("body").tophat(b);"fixed"===k&&(a(".th-wrapper").css("position",
k),a(".th-wrapper").css("width","100%"));var q=0,n=a(".th-help-link-container").offset(),r=n.left-l;null!==l&&(a("#earthdata-tophat2").css("width",l),a(".th-help-panel").css("margin-right",r),a(window).resize(function(){n=a(".th-help-link-container").offset();r=n.left-l;marginRight=r+67;q=a(window).width();q<l?(a("#earthdata-tophat2").css("width","auto"),a(".th-help-panel").css("margin-right","18px")):(a("#earthdata-tophat2").css("width",l),a(".th-help-panel").css("margin-right",marginRight))}).resize());
a("#th-home-link").click(function(){p({Action:'"Clicked Earthdata Home Link"'})});a("#th-help-link").click(function(){p({Action:'"Clicked Help Link"'})});a("#th-fbm-link").click(function(){p({Action:'"Clicked Feedback Module Link"'})});a("#th-status-link").click(function(){p({Action:'"Clicked Status App Link"'})});a("#daac-links-header").click(function(){p({Action:'"Clicked DAAC Menu"'})});a(".th-daac-links ul li a").click(function(){p({Action:'"Clicked DAAC Link"',LinkUrl:a(this).attr("href"),LinkText:a(this).text()})})})})(jQuery.noConflict(!0))})})();
