/*************************************************************************************** Required Modules ******************************************************************************************************/

var jsdom = require("jsdom");
var fs = require("fs");
var sleep = require("sleep");
/************************************************************************************ Variables **************************************************************************************************************/

var baseUrl = "https://www.practo.com";
var place = "bangalore";
var type = "ayurveda";
var basePath = "/home/user/crawl/practo/temp/outputfiles/geturls/";
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
	
	var doctorUrl = window.document.getElementsByClassName("link doc-name smokeliftDoctorLink");
	for (var i = 0; i<doctorUrl.length; i++){
	    finaldoctorurl = doctorUrl[i].href;
	    console.log(finaldoctorurl);

	    data = finaldoctorurl + "\n";
	    
	    fs.appendFile(fileName, data, function (err){											 //
		if (err) return console.log(err);												 //
	    });																	 
	    var nextUrl = "Not Available";                                                                                                                                     //
	}
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
	    GetListofDoctors(list, current, true, nextUrl, fileName);
	    console.log("Next url -> " + nextUrl);
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

readCities.readFile("/home/user/crawl/practo/temp/inputfiles/cities.txt", "utf-8", function (err,data){
    if (err) throw err;
    cities = data.split("\n");
    readSpeciality.readFile("/home/user/crawl/practo/temp/inputfiles/specialities.txt", "utf-8", function (err, data){
 	if (err) throw err;
 	spclty = data.split("\n");
 	var list = [];
 	for( var j=0; j < cities.length ; j++){
 	    for(var k=0; k < spclty.length ; k++){
		if( cities[j] == "" || spclty[k] == "") continue ;
 		else{
		    actualUrl = baseUrl + "/" + cities[j] + "/" + spclty[k];
		    fileName = basePath + cities[j] + "_" + spclty[k] + "_url.tsv";
 		    list.push({actualUrl: actualUrl.toString(), fileName: fileName.toString()});
 		}
 	    }
 	};
	console.log(list);
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
