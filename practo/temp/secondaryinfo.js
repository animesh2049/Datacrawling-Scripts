/*************************************************************************************** Required Modules ******************************************************************************************************/

var jsdom = require("jsdom");
var fs = require("fs");
var sleep = require("sleep");

/************************************************************************************ Variables **************************************************************************************************************/

var baseUrl = "https://www.practo.com";
var place = "bangalore";
var type = "ayurveda";
var basePath = "/home/animesh/crawl/practo/temp/outputfiles/secondary/";
var firstLineofFile = "Name" + "\t" + "Qualification" + "\t" + "Experience" + "\t" + "Speciality" + "\t" +
		      "Clinic Name" + "\t" + "Clinic Url" + "\t" + "Recommendations" + "\t" + "Timings" + "\t" + "Address" + "\t" + "Fee" + "\n";
//var actualUrl = baseUrl + "/" + place + "/" + type ;
var actualUrl = "";
var name, qualification, experience, speciality, clinicName, clinicUrl, recommendations;
var timings, timingsHoursTimings1, timingsStrongDayTimings, timingsHoursTimings2;
var address, fee, numberpattern;
var doctorSpecialities = "";
var data = [];
var urls = [];
var dataToWrite = "";
var presentcounter = 0;
var fileName = basePath + "test.tsv";
/************************************************************************************** Heading of file *******************************************************************************************************/


/************************************************************************************** Main function ********************************************************************************************************/

function GetDoctorProfile(counter){
    console.log(urls[counter]);
    if (urls[counter] == "" || urls[counter] == undefined || counter >= urls.length){
    	console.log(urls[counter]);
    	console.log(counter);
	process.exit(0)
    }
    jsdom.env( urls[counter], ["jQuery.js"], function (err, window){
    	if (err)
    	       throw err;
    	try {
    	    results = window.document.getElementsByClassName("profile-container");		
    	}
    	catch (err){
    	    console.log(err);
    	    GetDoctorProfile(counter+1);
    	}
	if(results.length == 0){
	    console.log("length is zero");
	    GetDoctorProfile(counter+1);
	}
	for(var i = 0; i<results.length; i++){
	    try {
	    	dataToWrite = "";
		id = window.document.getElementsByClassName("report-error-container form-overall")[0].getElementsByTagName("input")[2].value;
	    }
	    catch (error){
		console.log(error);
		id = "Not Available";
	    }
	    try {
		name = results[i].getElementsByClassName("doctor-details-wrapper")[0]
				 .getElementsByTagName("h1")[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "");
	    }
	    catch (error){
		console.log(error);
		name = "Not Available";
	    }
	    
	    try {
		qualification = results[i].getElementsByClassName("doctor-details-wrapper")[0]
					  .getElementsByClassName("doctor-qualifications")[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "");
	    }
	    catch (error){
		console.log(error);
		qualification = "Not Available";
	    }
	    try {
		specialities = results[i].getElementsByClassName("doctor-details-wrapper")[0]
					 .getElementsByClassName("doctor-specialties")[0].getElementsByClassName("link grey");
		doctorSpecialities = "";
		for (var j=0;j<specialities.length;j++){
		    doctorSpecialities += specialities[j].innerHTML.replace(/\t/g, "").replace(/\n/g, "");
		}
	    }
	    catch (error){
		console.log(error);
		doctorSpecialities = "Not Available";
	    }
	    try {
		experience = results[i].getElementsByClassName("doctor-details-wrapper")[0]
				       .getElementsByClassName("doctor-specialties")[0].
					innerHTML.replace(/\t/g, "").replace(/\n/g, "").replace(/ /g, "").replace(/\<.*[^\>]\>/g, "").split(",")[1];	     
	    }
	    catch (error){
		console.log(error);
		experience = "Not Available";
	    }
	    try {
		recommendations = results[i].getElementsByClassName("doctor-details-wrapper")[0]
					    .getElementsByClassName("recommend")[0].innerHTML
					    .replace(/\t/g, "").replace(/\n/g, "").replace(/ /g, "")
					    .replace(/\<.*[^\>]\>/g, "");
	    }
	    catch (error){
		console.log(error);
		recommendations = "Not Available";
	    }
	    try {
		summary = results[i].getElementsByClassName("doctor-summary")[0].getElementsByTagName("meta")[0].content;
	    }
	    catch (error){
		console.log(error);
		summary = "Not Available";
	    }
	    try {
		allServicesAvailable = results[i].getElementsByClassName("service-row responsive-hide");
		allServicesLenght = allServicesAvailable.length;
		services = "";
		for (var service=0; service < allServicesLenght; service++){
		    if (service == allServicesLenght-1)
			services += allServicesAvailable[service].innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
								 .replace(/\t/g, "").replace(/  /g, "");
		    else 
			services += allServicesAvailable[service].innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
								 .replace(/\t/g, "").replace(/  /g, "") + " ";
		}
	    }
	    catch (error){
		console.log(error);
		services = "Not Available";
	    }
	    try {
		otherData = results[i].getElementsByClassName("doc-info-section-row")[0];
		otherSpecialitiesBlock = otherData.getElementsByClassName("specialty-row responsive-hide");
		otherSpecialitiesLenght = otherSpecialitiesBlock.length;
		otherSpecialities = "";
		for(var len=0; len < otherSpecialitiesLenght; len++){
		    otherSpecialities += otherData.getElementsByClassName("specialty-row responsive-hide")[len].innerHTML
						  .replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
						  .replace(/\t/g, "").replace(/  /g, "") + " ";
		    if (len != otherSpecialitiesLenght-1){
			otherSpecialities += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		otherSpecialities = "Not Available";
	    }
	    try {
		otherData = results[i].getElementsByClassName("doc-info-section qualifications-block")[0];
		otherEducationBlock = otherData.getElementsByClassName("qualification-row responsive-hide  ");
		otherEducationLength = otherEducationBlock.length;
		otherEducation = "";
		for(var len=0; len < otherEducationLength; len++){
		    otherEducation += otherData.getElementsByClassName("qualification-row responsive-hide  ")[len]
					       .innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
					       .replace(/\t/g, "").replace(/  /g, "");
		    if (len != otherEducationLength-1){
			otherEducation += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		otherEducation = "Not Available";
	    }
	    try {
		otherData = results[i].getElementsByClassName("doc-info-section organizations-block")[0];
		otherExperienceBlock = otherData.getElementsByClassName("organization-row responsive-hide");
		otherExperienceLength = otherExperienceBlock.length;
		otherExperience = "";
		for(var len=0; len<otherExperienceLength; len++){
		    otherExperience += otherData.getElementsByClassName("organization-row responsive-hide")[len]
						.innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
						.replace(/\t/g, "").replace(/  /g, "");
		    if (len != otherExperienceLength-1){
			otherExperience += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		otherExperience = "Not Available";
	    }
	    try {
		awards = results[i].getElementsByClassName("doc-info-section awards-block")[0];
		awardsBlock = awards.getElementsByClassName("award-row responsive-hide");
		awardsLength = awardsBlock.length;
		allAwards = "";
		for (var len=0 ; len<awardsLength; len++){
		    allAwards += awards.getElementsByClassName("award-row responsive-hide")[len]
		    		       .innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
				       .replace(/\t/g, "").replace(/  /g, "");
		    if(len != awardsLength-1){
			allAwards += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		allAwards = "Not Available";
	    }
	    try {
		membership = results[i].getElementsByClassName("doc-info-section memberships-block")[0];
		membershipBlock = results[i].getElementsByClassName("membership-row responsive-hide");
		membershipLength = membershipBlock.length;
		allMembership = "";
		for(var len=0; len<membershipLength; len++){
		    allMembership += membership.getElementsByClassName("membership-row responsive-hide")[len]
		    			       .innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
					       .replace(/\t/g, "").replace(/  /g, "");
		    if(len != membershipLength-1){
			allMembership += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		allMembership = "Not Available";
	    }
	    try {
		registrations = results[i].getElementsByClassName("doc-info-section registrations-block")[0];
		registrationBlock = registrations.getElementsByClassName("registration-row responsive-hide");
		registrationsLength = registrationBlock.length;
		allRegistrations = "";
		for(var len=0; len<registrationsLength; len++){
		    allRegistrations += registrations.getElementsByClassName("registration-row responsive-hide")[len]
		    				     .innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ")
						     .replace(/\t/g, "").replace(/  /g, "");
		    if(len != registrationsLength-1){
			allRegistrations += ",";
		    }
		}
	    }
	    catch (error){
		console.log(error);
		allRegistrations = "Not Available";
	    }
	    try {
		clinicBlock = results[i].getElementsByClassName("clinic-block listing-row");
		number_of_clinics = clinicBlock.length;
		var timings = "";
		var loopCounter = 0;
		for(var clinics=0 ; clinics < number_of_clinics; clinics++){
		    timings = "";
		    try {
			clinicLocation = clinicBlock[clinics].getElementsByClassName("clinic-locality")[0].innerHTML
							     .replace(/\<.[^\>]*\>/g, "").replace(/\t/g, "").replace(/\n/g, "");
		    }
		    catch (error){
			console.log(error);
			clinicLocation = "Not Available";
		    }
		    try {
			clinicAddress =  clinicBlock[clinics].getElementsByClassName("clinic-address")[0]
							     .innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\t|\n/g, "").replace(/\&amp/g, "&");
		    }
		    catch (error){
			console.log(error);
			clinicAddress = "Not Available";
		    }
		    try {
			allTimings = clinicBlock[clinics].getElementsByClassName("clinic-timings-wrapper");
			number_of_timings = allTimings.length;
			for (var time = 0; time < number_of_timings; time++){
			    if (time == number_of_timings-1)
				timings += allTimings[time].innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\t/g, "").replace(/\n/g, " ");
			    else 
				timings += allTimings[time].innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\t/g, "").replace(/\n/g, " ") + ",";
			}
		    }
		    catch (error){
			console.log(error);
			timings = "Not Available";
		    }
		    try {
			clinicFee = clinicBlock[clinics].getElementsByClassName("clinic-fees")[0]
							.innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\n/g, " ").
							 replace(/\t/g, "").split("  ")[0]
		    }
		    catch (error){
			clinicFee = "Not Available";
		    }
		    try {
			whetherDirectBookingAvailable = clinicBlock[clinics].
									     getElementsByClassName("booking-button-container")[0].
									     getElementsByClassName("button-text")[0].innerHTML.replace(/\n| /g, "");
		    }
		    catch (error){
			console.log(error);
			whetherDirectBookingAvailable = "Not Available";
		    }
		    dataToWrite += id + "\t" + name + "\t" + qualification + "\t" + doctorSpecialities + "\t" + experience + "\t" + recommendations +
				   "\t" + summary + "\t" + clinicLocation + "\t" + clinicAddress + "\t" +
				   timings + "\t" + clinicFee + "\t" + whetherDirectBookingAvailable + "\t" + services  +
				   "\t" + otherSpecialities  + "\t" + otherEducation + "\t" + otherExperience + "\t" + allAwards +
				   "\t" + allMembership + "\t" + allRegistrations + "\n";
		}
	    }
	    catch (error){
		console.log(error);
		GetDoctorProfile(counter+1);
	    }
	    fs.appendFile(fileName, dataToWrite, function (err){
		if (err) console.log(err);
		GetDoctorProfile(counter+1);
	    })
	}
    });
}

/**************************************************************************************** Calling Function ***************************************************************************************************/

//GetListofDoctors( actualUrl, fileName);


var readSpeciality = require("fs");
var readCities = require("fs");

readCities.readFile("/home/animesh/crawl/practo/temp/inputfiles/doctorurl", "utf-8", function (err,data){
    if (err) throw err;
    data = data.split("\n");
    var len = data.length;
    for(var i=0;i<len; i++){
	urls.push(data[i]);
    }
    //console.log(urls);
    GetDoctorProfile(0);
});
