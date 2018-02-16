//when clicking the submit button on the expression module
$("#submit").on("click",function(){
	//get the value of the answer chosen
	var guessedAnswer = $(".choice:checked").val();

	//if the user has answered the question then the answer to this will not be undefined
	if(guessedAnswer!=undefined){
		//send the answer along with the question to the expression route
		var currLoc = window.location;

		$.post(currLoc+"/expression_submit", {
					id:$("#question").attr("value"),
					chosenAns:guessedAnswer
				}, 
		    function(returnedData){
		    	window.location.reload();
		    }
		);
	} else {
		//if the answer has not be chosen show a message stating that
		$("#msg").text("Please select an answer before submitting question")
	}
});

//click listener for choosing a choice
$(".choice").on("click",function(){
	//when clicked first remove animate class from all choices
	$(".choice").parent().removeClass("animate");
	//then put it on the parent of the radio that was actually clicked
	$(this).parent().addClass("animate");

})

//if the parent of the radio button was actually clicked instead of the radio, then check to see if it has class animate
//if it doesn't, then add it and check the radio button that is in it
$(".choiceContainer").on("click",function(){
	if(!$(this).hasClass("animate")){
		$(".choiceContainer").removeClass("animate");
		$(this).addClass("animate");
		$(this).find("input")[0].checked=true;
	}
})