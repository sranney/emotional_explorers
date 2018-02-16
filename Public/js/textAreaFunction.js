//for counting down the number of characters left that are allowed in the text area
$("textArea").on("input propertychange",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text(remainingLength + " characters remaining");
	//changing the color of the alert for the number of characters left
	if(remainingLength<50){
		$(".textCounter").css("color","red");
	} else if(remainingLength<75){
		$(".textCounter").css("color","orange");
	} else if(remainingLength<100){
		$(".textCounter").css("color","#CCCC00");
	} else {
		$(".textCounter").css("color","black");
	}
});

//for showing the number of characters left when the text area has been put in focus
$("textArea").on("focus",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text(remainingLength + " characters remaining");
})
//for hiding the number of characters left when the text area has been put out of focus
$("textArea").on("focusout",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text("");
})
