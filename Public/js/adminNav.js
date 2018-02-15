$("#refresh").on("click",function(){
	var currLocation = window.location;
	currLocation.reload();
});

var currLocation_href = window.location.href;
var currIndx = parseInt(currLocation_href.replace(currLocation_href.substr(0,currLocation_href.lastIndexOf("-")+1),""));
$("#prevStudent").on("click",function(){
	var goToIndx = currIndx-1;
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});

$("#nextStudent").on("click",function(){
	var goToIndx = currIndx+1;
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});

$("#firstStudent").on("click",function(){
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-0");
	window.location.href=nextLoc;
});

$("#lastStudent").on("click",function(){
	var goToIndx = $(this).val();
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});