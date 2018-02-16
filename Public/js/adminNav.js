//#refresh in the navbar is used for the admin to reload the page without having to click the refresh page
$("#refresh").on("click",function(){
	var currLocation = window.location;
	currLocation.reload();
});

//get the current url and the current index from the url
var currLocation_href = window.location.href;
var currIndx = parseInt(currLocation_href.replace(currLocation_href.substr(0,currLocation_href.lastIndexOf("-")+1),""));

//#prevStudent button when clicked will navigate the user to an index one less than the current
//if the admin is viewing studentProfile-2, pushing the #prevStudent button will navigate the admin to studentProfile-1
$("#prevStudent").on("click",function(){
	var goToIndx = currIndx-1;
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});

//#nextStudent button when clicked will navigate the user to an index one greater than the current
//if the admin is viewing studentProfile-1, pushing the #nextStudent button will navigate the admin to studentProfile-2
$("#nextStudent").on("click",function(){
	var goToIndx = currIndx+1;
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});

//#firstStudent button when clicked will navigate the user to studentProfile-0
$("#firstStudent").on("click",function(){
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-0");
	window.location.href=nextLoc;
});

//#firstStudent button when clicked will navigate the user to their last student page
$("#lastStudent").on("click",function(){
	//the index of the last student is set as the value of the button, so setting goToIndx to this
	var goToIndx = $(this).val();
	var nextLoc = currLocation_href.replace("studentProfile-"+currIndx,"studentProfile-"+goToIndx);
	window.location.href=nextLoc;
});