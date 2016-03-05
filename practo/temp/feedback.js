var fs1 = require("fs");
var fs2 = require("fs");
var Nightmare = require("nightmare");
var nightmare = Nightmare({show: true});
var check = "";
var data = "";
var displayStatus, cardBlock, feedbackNumber; 
var html;
var doctorId, doctorName, reviewerName, reviewerTimeStamp, reviewerApproxTime, review, visitedFor;
var jsdom = require("jsdom");
var urls = [];
var presentCounter = 0;
function GetFeedBack(counter){
	console.log(urls[counter]);
    if (counter >= urls.length){
		process.exit(0);
    }
    try {
    	var tillhere = nightmare
    	.goto(urls[counter])
    	.wait(2000)
    	.click("#reviewsNavLink")
    	.wait(1000);
    }
    catch (err){
    	console.log(err);
    	GetFeedBack(urls[counter+1]);
    }
    for (var i = 0;i<15;i++){
	tillhere = tillhere.evaluate(function(){
	    	var a = document.getElementById('reviewsTab');
	    	var b = document.getElementsByClassName("review-card-sidebar");
	    	if (b == undefined || b == "none"){
	    		GetFeedBack[urls[counter+1]];
	    	}
	    	var c = a.getElementsByClassName("btn btn-white next-page recommended-next-page");
	    	c[0].click();
	});
	tillhere.wait(1000);
    };

    tillhere.evaluate(function(){
	var id = document.getElementsByClassName("report-error-container form-overall")[0].getElementsByTagName("input")[2].value
	var a = document.getElementById('reviewsTab');
	var data = [id, a.innerHTML]
	return data;		
    })
//	.end()
	.then(function (result){
		// console.log("came here");
	    htmls = result;
	    jsdom.env(htmls[1], ["http://code.jquery.com/jquery.js"], function (err, window) {
		result = window.document.getElementsByClassName("recommended-reviews sub-tab")[0].getElementsByClassName("my-reviews");
		len = result.length;
		for(var i = 0; i < len; i++){
			data = "";
		    feedbacks = result[i].getElementsByClassName("doctor-review-card");
		    len2 = feedbacks.length;
		    for(var j = 0; j < len2 ;j++){
			try{
			    id = htmls[0];
			}
			catch (error){
			    console.log(error);
			    id = "Not Available";
			}
			try{
			    reviewerName = feedbacks[j].getElementsByClassName("reviewer-name")[0].innerHTML.replace(/\<.*/g, "").replace(/\t|\n/g, "");
			}
			catch(err){
			    console.log(err);
			    reviewerName = "Not Available";
			}
			try {
			    reviewerTimeStamp = feedbacks[j].getElementsByClassName("reviewer-name")[0].getElementsByTagName("span")[0].getAttribute("datetime");
			}
			catch (err){
			    console.log(err);
			    reviewerTimeStamp = "Not Available";
			}
			try {
			    reviewerApproxTime = feedbacks[j].getElementsByClassName("reviewer-name")[0].getElementsByTagName("span")[0].innerHTML;
			}
			catch (err){
			    console.log(err);
			    reviewerApproxTime = "Not Available";
			}
			try {
			    visitedFor = feedbacks[j].getElementsByClassName("visited-for")[0].innerHTML.replace(/\<.*/g, "").replace(/\t|\n/g, "");
			}
			catch (err){
			    console.log(err);
			    visitedFor = "Not Available";
			}
			try {
			    review = feedbacks[j].getElementsByClassName("less-review")[0].innerHTML.replace(/\<.[^\>]*\>/g, "").replace(/\t|\n/g, "");
			}
			catch (err){
			    console.log(err);
			    review = "Not Available";
			}
			data += id + "\t" + reviewerName + "\t" + reviewerTimeStamp + "\t" + reviewerApproxTime + "\t" + visitedFor + "\t" + review + "\n";
		    }
		    fs1.appendFile("/home/user/crawl/practo/temp/outputfiles/tempfiles/feedback_test.tsv", data, function (err) {
			    if (err){
			    	console.log(err);
			    }
			    GetFeedBack(counter+1);
			})
		}})
	});
};

// urls = ["https://www.practo.com/agra/doctor/dr-jagdish-gupta-dentist-1"];
// setTimeout(function(){
// 	GetFeedBack(0);
// }, 1000);
// GetFeedBack(0);

// function temp(){
	
// }

urls = [];

fs2.readFile("/home/user/crawl/practo/temp/inputfiles/doctorurl", "utf-8", function (err,datax){
    if (err) {console.log(err)} ;
    datax = datax.split("\n");
    var len = datax.length;
    for(var i = 0; i < len; i++){
		if(datax[i].trim().length){
			console.log("Pushing " + datax[i])
			urls.push(datax[i]);
		}
    }
    setTimeout(function(){
    	console.log("Scraping process started");
	    GetFeedBack(0);
    }, 30000);
});