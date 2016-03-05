var jsdom = require("jsdom");
jsdom.env( "http://localhost:8000" , [], function(err, window) {
	console.log(window.document.getElementsByTagName("a")[0].innerHTML);
});