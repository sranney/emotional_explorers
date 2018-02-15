$("#submit").on("click",function(){
	var guessedAnswer = $(".choice:checked").val();

	if(guessedAnswer!=undefined){
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
		$("#msg").text("Please select an answer before submitting question")
	}
});

$(".choice").on("click",function(){

	$(".choice").parent().removeClass("animate");
	$(this).parent().addClass("animate");

})

$(".choiceContainer").on("click",function(){
	if(!$(this).hasClass("animate")){
		$(".choiceContainer").removeClass("animate");
		$(this).addClass("animate");
		$(this).find("input")[0].checked=true;
	}
})