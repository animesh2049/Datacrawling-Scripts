/*************************************************************************************** Required Modules ******************************************************************************************************/

var jsdom = require("jsdom");
var fs = require("fs");
var sleep = require("sleep");
/************************************************************************************ Variables **************************************************************************************************************/

var baseUrl = "https://www.practo.com";
var place = "bangalore";
var type = "ayurveda";
var basePath = "/home/user/crawl/practo/temp/outputfiles/dignose/";
var firstLineofFile = "Name" + "\t" + "Address" + "\t" + "Accredited" + "\t" + "Home-pickup" + "\t" +
		      "Online_reports" + "\t" + "Fee" + "\t" + "Timings"; 

var actualUrl = "";
var name, qualification, experience, speciality, clinicName, clinicUrl, recommendations, accredited;
var timings, timingsHoursTimings1, timingsStrongDayTimings, timingsHoursTimings2;
var address, fee, numberpattern;
var data = [];
var cities = [];
var spclty = [];
//var fileName = "./outputfiles/" + place + "_" + type + ".tsv";

/************************************************************************************** Heading of file *******************************************************************************************************/


/************************************************************************************** Main function ********************************************************************************************************/

function GetListofDoctors(list, current, isNextUrlPresent, url, fileName){

    if(isNextUrlPresent == undefined || isNextUrlPresent!=true){
	var url = list[current].actualUrl;
	var fileName = list[current].fileName;
    }

    jsdom.env( url , ["jQuery.js"], function(err, window) {
    	var results = null;
	try{
	    results = window.document.getElementsByClassName("listing-row");                                                                     
	    if(!results.length){
		results = null;
	    }
	}
	catch(e){
            console.log("Error");
	    results = null;
	}
	if(results != ""  && results!=null){
	    for (var i=0; i<results.length; i++){													 
		try {
		    name = results[i].getElementsByClassName("diag-details-block diag-name-container")[0].getElementsByTagName("h2")[0]
				     .innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");
		}																	 
		catch (err){															 
		    name = "Not Available";														 
		}
		try {
		    address = results[i].getElementsByClassName("diag-details-block diag-name-container")[0].getElementsByTagName("span")[1].innerHTML;
		}																	 
		catch (err){															 
		    address = "Not Available";												 
		}
		try {																 
		    accredited = results[i].getElementsByClassName("accredit-text")[0].innerHTML
					   .replace(/\n/g, "").replace(/^\s+|\s+$/g, "").replace(/\s\s+/g, ' ');
		}
		catch (err){															 
		    accredit = "Not Available";
		}
		try {																 
		    homePickup = results[i].getElementsByClassName("home-sample-text")[0].innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");
		}																	
		catch (err){															
		    homePickup = "Not Available";
		}																	
		try {
		    onlineReports = results[i].getElementsByClassName("online-reports-text")[0].innerHTML.replace(/\n/g, "").replace(/^\s+|\s+$/g, "");
		}																	
		catch (err){
		    onlineReports = "Not Available";
		}																	
		try {
		    fee = results[i].getElementsByClassName("diag-price")[0].getElementsByTagName("span")[1].innerHTML;
		}																	
		catch (err){															
		    fee = "Not Available";													
		}
		try {
		    timings = results[i].getElementsByClassName("timings-block")[0].getElementsByTagName("span")[1].innerHTML;
		}
		catch (err){
		    timings = "Not Available";
		}
		data = name + "\t" + address + "\t" + accredited + "\t" + homePickup + "\t" + onlineReports + "\t" + fee + "\t" + timings + "\n";
		fs.appendFile(fileName, data, function (err){											
		    if (err) return console.log(err);												
		});																	
	    
	}; 
	var nextUrl = "Not Available";                                                                                                                                    
	try {
	    nextUrl = window.document.getElementsByClassName("page_link_next")[0].href;
	}
	catch (err){
	    nextUrl = "Not Available"
	}
	if (nextUrl != "Not Available"){
	    console.log("Next page is available");
	    GetListofDoctors(list, current, true, nextUrl, fileName)
	    
	}
	else if(current >= (list.length-1) ){
	    return ;
	}
	else{
	    console.log("NEXT -> " + list[current+1].fileName);
	    GetListofDoctors(list, current+1);
	}
	    }
    });
}

/**************************************************************************************** Calling Function ***************************************************************************************************/




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
		    fileName = basePath + cities[j] + "_" + spclty[k] + ".tsv";
 		    console.log(actualUrl);
 		    list.push({actualUrl: actualUrl.toString(), fileName: fileName.toString()});
 		    console.log(list.length-1 + " " +  actualUrl);
 		}
 	    }
 	};
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
    });
});
