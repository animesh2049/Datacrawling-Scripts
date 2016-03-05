/*************************************************************************************** Required Modules ******************************************************************************************************/

var jsdom = require("jsdom");
var fs = require("fs");
var sleep = require("sleep");
/************************************************************************************ Variables **************************************************************************************************************/

var baseUrl = "https://www.practo.com";
var place = "bangalore";
var type = "ayurveda";
var basePath = "/home/user/crawl/practo/outputfiles_physio/";
var firstLineofFile = "Name" + "\t" + "Qualification" + "\t" + "Experience" + "\t" + "Speciality" + "\t" +
		      "Clinic Name" + "\t" + "Clinic Url" + "\t" + "Recommendations" + "\t" + "Timings" + "\t" + "Address" + "\t" + "Fee" + "\n";
//var actualUrl = baseUrl + "/" + place + "/" + type ;
var actualUrl = "";
var name, qualification, experience, speciality, clinicName, clinicUrl, recommendations;
var timings, timingsHoursTimings1, timingsStrongDayTimings, timingsHoursTimings2;
var address, fee, numberpattern;
var data = [];
var cities = [];
var spclty = [];
//var fileName = "./outputfiles/" + place + "_" + type + ".tsv";

/************************************************************************************** Heading of file *******************************************************************************************************/


/************************************************************************************** Main function ********************************************************************************************************/

function GetListofDoctors(list, current, isNextUrlPresent, url, fileName){
	// console.log(JSON.stringify(list));
	if(isNextUrlPresent == undefined || isNextUrlPresent!=true){
		var url = list[current].actualUrl;
		var fileName = list[current].fileName;
	}
	console.log(url);

    jsdom.env( url , ["jQuery.js"], function(err, window) {
    	var results = null;
    	console.log(window);
		try{
			results = window.document.getElementsByClassName("listing-row"); 
			//console.log(results.length);                                                                    //
			if(!results.length){
				results = null;
			}
		}
		catch(e){
			results = null;
		}
		if(results != ""  && results!=null){
			for (var i=0; i<results.length; i++){													 //
			    try {																 //
					name = results[i].getElementsByClassName("doc-details-block")[0]								 // Name of Doctor
						 .getElementsByTagName("h2")[0].innerHTML.replace(/\n/g, "")							 //
						 .replace(/^\s+|\s+$/g, "");											 //
			    }																	 //
			    catch (err){															 //
					name = "Not Available";														 //
			    }																	 //
			    try {																 //
					qualification = results[i].getElementsByClassName("doc-qualifications")[0]							 // Qualification of Doctor
							  .innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");						 //
			    }																	 //
			    catch (err){															 //
					qualification = "Not Available";												 //
			    }																	 //
			    try {																 //
					experience = results[i].getElementsByClassName("doc-exp-years")[0]								 // Experience
						       .innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");							 //
			    }																	 //
			    catch (err){															 //
					experience = "Not Available";													 //
			    }																	 //
			    try {																 //
					speciality = results[i].getElementsByClassName("doc-specialties")[0]								 // Speciality
						       .getElementsByTagName("span")[0].innerHTML.replace(/\n/g, "")						 //
						       .replace(/^\s+|\s+$/g, "");										 //
			    }																	 //
			    catch (err){															 //
					speciality = "Not Available";													 //
			    }																	 //
			    try {																 //
					clinicName = results[i].getElementsByClassName("doc-clinic-name")[0]								 // Clinic Name
						       .getElementsByClassName("light_grey link smokeliftClinicLink")[0]					 //
						       .getElementsByTagName("span")[0]										 //
						       .innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");							 //
			    }																	 //
			    catch (err){															 //
					clinicName = "Not Available";													 //
			    }																	 //
			    try {																 //
					clinicUrl = results[i].getElementsByClassName("doc-clinic-name")[0]								 // Clinic Url
						      .getElementsByClassName("light_grey link smokeliftClinicLink")[0].href;					 //
			    }																	 //
			    catch (err){															 //
					clinicUrl = "Not Available";													 //
			    }																	 //
			    try {																 //
					numberpattern = /\d+/g;														 //
					recommendations = results[i].getElementsByClassName("doc-availability-block")[0]						 // Recommendations
							    .getElementsByClassName("recommend")[0].innerHTML.replace(/\n/g, "")				 //  
							    .match(numberpattern)[0];										 //
			    }																	 //
			    catch (err){															 //
					recommendations = "Not Available";												 //
			    }																	 //
			    try {																 //
					timingsStrongDayTimings = results[i].getElementsByClassName("timings-block")[0]							 // Timings Day wise 
								    .getElementsByClassName("strong days-timing")[0].innerHTML;					 //
			    }																	 //
			    catch (err){															 //
					timingsStrongDayTimings = "Not Available";											 //
			    }																	 //
			    try {																 // 
					timingsHoursTimings1 = results[i].getElementsByClassName("hours-timing")[0]							 // Hours Timings of first half
								 .innerHTML;											 //
			    }																	 //
			    catch (err){															 //
					timingsHoursTimings1 = "Not Available";												 //
			    }																	 //
			    try {																 //
					timingsHoursTimings2 = results[i].getElementsByClassName("hours-timing")[1]							 // Hours Timings of Second half
								 .innerHTML;											 //
			    }																	 //
			    catch (err){															 //
					timingsHoursTimings2 = "Not Available";												 //
			    }																	 //
			    try {																 //
					timings = timingsStrongDayTimings + "(" + timingsHoursTimings1 + "," + timingsHoursTimings2 + ")";				 // 
			    }																	 //
			    catch (err){															 //
					timings = "Not Available";													 //
			    }																	 //
			    try {																 //
					address = results[i].getElementsByClassName("locality")[0].getElementsByTagName("span")[1]					 // Address
						    .innerHTML + "," + results[i].getElementsByClassName("locality")[0]						 //
						    .getElementsByTagName("span")[2].innerHTML;									 //
			    }																	 //
			    catch (err){															 //
					address = "Not Available";													 //
			    }																	 //
			    try {																 //
					fee = results[i].getElementsByClassName("fees-amount")[0].innerHTML.replace(/\n/g, "")						 //
						.replace(/^\s+|\s+$/g, "");											 //
			    }																	 //
			    catch (err){															 //
					fee = "Not Available";														 //
			    }																	 //
			    data = name + "\t" + qualification + "\t" + experience + "\t" + speciality + "\t" +							 //
						clinicName + "\t" + clinicUrl + "\t" + recommendations + "\t" + timings + "\t" + address + "\t" + fee + "\n";		 //
			    fs.appendFile(fileName, data, function (err){											 //
					if (err) return console.log(err);												 //
			    });																	 // Writing data to file
			}
		};  
		var nextUrl = "Not Available";                                                                                                                                     //
		try{
		    nextUrl = window.document.getElementsByClassName("page_link_next")[0].href;
		}
		catch (err){
		    nextUrl = "Not Available"
		}
		try{
			window.close();
		}
		catch(e){

		}

		if (nextUrl != "Not Available"){
			console.log("Next page is available");
			GetListofDoctors(list, current, true, nextUrl, fileName)
		    // console.log("Next url -> " + nextUrl);
		}
		else if(current >= (list.length-1) ){
			return ;
		}
		else{
			console.log("NEXT -> " + list[current+1].fileName);
			GetListofDoctors(list, current+1);
		}

    });
}

/**************************************************************************************** Calling Function ***************************************************************************************************/

//GetListofDoctors( actualUrl, fileName);


var readSpeciality = require("fs");
var readCities = require("fs");

readCities.readFile("/home/user/crawl/practo/inputfiles/cities.txt", "utf-8", function (err,data){
    if (err) throw err;
    cities = data.split("\n");
    readSpeciality.readFile("/home/user/crawl/practo/inputfiles/specialities.txt", "utf-8", function (err, data){
 	if (err) throw err;
 	spclty = data.split("\n");
 	var list = [];
 	for( var j=0; j < cities.length ; j++){
 	    for(var k=0; k < spclty.length ; k++){
			if( cities[j] == "" || spclty[k] == "") continue ;
 			else{
				actualUrl = baseUrl + "/" + cities[j] + "/" + spclty[k];
				fileName = basePath + cities[j] + "_" + spclty[k] + ".tsv";
 				list.push({actualUrl: actualUrl.toString(), fileName: fileName.toString()});
 				console.log(list.length-1 + " " +  actualUrl);
 			}
 	    }
 	};

 	console.log("Process started");
	console.log("From which index do you want to start");
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (chunk) {
		var index = 0;
		index = parseInt(chunk);
		
		if(parseInt(index) !== index || index === ""){
			index = 0;
			console.log("Not a valid index, starting from the beginning");
		}

		GetListofDoctors(list, index);
		process.stdin.end();
	});

    }
    );
});
