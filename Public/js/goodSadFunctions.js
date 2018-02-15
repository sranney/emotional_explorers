var goodSad = "";

$("#submit").on("click",function(){

	var goodSadEntry = $("textarea#goodSadEntry").val();
	if(goodSad==""||goodSadEntry==""){
		$("#msg").text("Please select an answer before submitting question")
	} else {
		var currLoc = window.location;

		$.post(currLoc+"/goodsad_submit", {
					id:$("#questionPrompt").attr("value"),
					goodSad: goodSad,
					answer: goodSadEntry
				}, 
		    function(returnedData){
		    	window.location.reload();
		    }
		);		
	}

});
//for animation on buttons
$("#choice-Good-Sad>button").on("click",function(){
	$("#choice-Good-Sad>button").removeClass("slideAnimate");
	$(this).addClass("slideAnimate");
	goodSad = $(this).val();
})

$(".choiceContainer").on("click",function(){
	if(!$(this).hasClass("animate")){
		$(".choiceContainer").removeClass("animate");
		$(this).addClass("animate");
		$(this).find("input")[0].checked=true;
	}
})