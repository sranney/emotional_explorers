$("textArea").on("input propertychange",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text(remainingLength + " characters remaining");
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

$("textArea").on("focus",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text(remainingLength + " characters remaining");
})
$("textArea").on("focusout",function(e){
	var entryLength = $("textArea").val().length;
	var remainingLength = 250 - entryLength;
	$(".textCounter").text("");
})
