var goodSad = "";
//when clicking the submit button on the goodsad module
$("#submit").on("click",function(){
	//get value of the entry in the text area
	var goodSadEntry = $("textarea#goodSadEntry").val();
	//if the value is blank or the button for good/sad has not been clicked, then state that the user needs to click the button and write a response
	if(goodSad==""||goodSadEntry==""){
		$("#msg").text("Please select an answer before submitting question")
	} else {
		//else do a post request to goodsad submit to mark the answer in the database
		var currLoc = window.location;

		$.post(currLoc+"/goodsad_submit", {
					id:$("#questionPrompt").attr("value"),
					goodSad: goodSad,
					answer: goodSadEntry
				}, 
		    function(returnedData){
				//reload page and get new question
		    	window.location.reload();
		    }
		);		
	}

});

//click listener for choosing a choice
$("#choice-Good-Sad>button").on("click",function(){
	//add animation class to specific button and remove it from the other one
	$("#choice-Good-Sad>button").removeClass("slideAnimate");
	$(this).addClass("slideAnimate");
	goodSad = $(this).val();
})
