//for changing the userform for signing up for a student versus an admin
$("#userType").on("change",function(){
	if($(this).val()=="Student"){
		$("#accessKey").attr("type","text");
		$("#studentInfo").css("display","flex");
		$("#about").css("display","block");
	} else {
		$("#accessKey").val("");
		$("#studentInfo").css("display","none");
		$("#about").css("display","none");
		$("#accessKey").attr("type","hidden");
	}
})

//for clicking the button to show current students
$("#currentStudents").on("click",function(){
	//show the modal to show students
	$("#myModal").show();
});

//for clicking the button to add questions
$("#addQ").on("click",function(){
	//show the modal to show questions
	$("#myQModal").show();
});

//for clicking on button that will navigate to looking at individual students result statistics
$(".viewStats").on("click",function(){
	window.location = "/studentProfile-"+$(this).val();
});

var currentLoc = window.location;

//for admin clicking on dig deeper buttons on the individual student statistics buttons labeled dig deeper

$(".digDeeper").on("click",function(){
	var EmotPath = $(this).val();
	//for getting data that is based on an individual student's answers for a certain emotion and module
	$.ajax({
		url:currentLoc+"/"+EmotPath,
		method:"get"
	}).done(function(result){
		//result will include the type of module 		
		var modalHTML="";
		//if the type of module is sentence then add html to the modal to format and show the answers for the sentence modal
		if(result[0].type=="sentence"){
			$("#AdminQModal > div > div > div.modal-body").css("max-height","200px");
			for (var i = 0 ; i < result.length; i++){	
				modalHTML+="<div class='resultBlock'>";
				modalHTML+="<div class='digQ'>Question: "+result[i].questionText+"</div>";
				modalHTML+="<div class='digCorr'>Correct Answer: "+result[i].emotion+" (category <em>"+result[i].emotion_group+"</em>)</div>";
				var color = result[i].correct==1? "green":"red";
				modalHTML+="<div class='digGuess' style='color:"+color+"'>Guessed Answer: "+result[i].guessedAnswer+"</div>";
				modalHTML+="<div class='digTime'>Answered At: "+result[i].updatedAt+"</div>";
				modalHTML+="</div>";
			}
		} else if(result[0].type=="picture"){
			//if the type of module is expression then add html to the modal to format and show the answers for the expression modal
			$("#AdminQModal > div > div > div.modal-body").css("max-height","400px");			
			for (var i = 0 ; i < result.length; i++){	
				modalHTML+="<div class='resultBlock'>";
				modalHTML+="<div class='digQ'><img src='https://expression-matching.s3.amazonaws.com/"+result[i].imageSource+"'></div>";
				modalHTML+="<div class='digCorr'>Correct Answer: "+result[i].emotion+" (category <em>"+result[i].emotion_group+"</em>)</div>";
				var color = result[i].correct==1? "green":"red";
				modalHTML+="<div class='digGuess' style='color:"+color+"'>Guessed Answer: "+result[i].guessedAnswer+"</div>";
				modalHTML+="<div class='digTime'>Answered At: "+result[i].updatedAt+"</div>";
				modalHTML+="</div>";
			}			
		} else if(result[0].type=="gs"){
			//if the type of module is goodsad then add html to the modal to format and show the answers for the goodsad modal
			$("#AdminQModal > div > div > div.modal-body").css("max-height","200px");
			for (var i = 0 ; i < result.length; i++){	
				modalHTML+="<div class='resultBlock'>";
				modalHTML+="<div class='digQ'>Prompt: "+result[i].questionText+"</div>";
				modalHTML+="<div class='digGS' style='color:blue'>Good/Sad: "+result[i].goodSad+"</div>";
				modalHTML+="<div class='digGuess' style='color:blue'>Written Response: "+result[i].answer+"</div>";
				modalHTML+="<div class='digTime'>Answered At: "+result[i].updatedAt+"</div>";
				modalHTML+="</div>";
			}			
		}
		//put the modal html that was created above into the modal
		$("#AdminQModal > div > div > div.modal-body").html(modalHTML);
	});
});

//for when the student clicks the layout button, show the student's modal for them to be able to change their background and their picture
$("#layout").on("click",function(){
	$("#myModal").show();
})

//for displaying the current background of the student's profile
var currBGPic = $("#descrBG").text().replace("Your current background is ","");
currBGPic = currBGPic.substr(0,currBGPic.indexOf("."));
//for displaying the current picture of the student's profile
var currPic = $("#descrPic").text().replace("Your current picture is ","");
currPic = currPic.substr(0,currPic.indexOf("."));
//for displaying chosen pic and chosen background pic when a student clicks on a differnet picture
var chosenBGPic="",chosenPic="";

//for switching between viewing background picture menu and profile picture
$("#backgroundBtn").on("click",function(){
	$(".modal-body.background").css("display","block");
	$(".modal-body.picture").css("display","none");
	$("#descrBG").css("display","block");
	$("#descrPic").css("display","none");
});
//for switching between viewing background picture menu and profile picture
$("#pictureBtn").on("click",function(){
	$(".modal-body.picture").css("display","block");
	$(".modal-body.background").css("display","none");
	$("#descrBG").css("display","none");
	$("#descrPic").css("display","block");
});

//for styling a background picture that is clicked and adding text to show the chosen picture.
$(".backgroundPic").on("click",function(){
	$(".backgroundPic").css("border","none");
	$(this).css("border","5px solid #0AC2FF");

	chosenBGPic = $(this).attr("value");
	if(currBGPic!=chosenBGPic){
		$("#changeLayout").css("display","block");
		var currDescr = $("#descrBG").text();
		if(currDescr.indexOf("Change")==-1){
			$("#descrBG").text($("#descrBG").text()+" Change background to " + chosenBGPic+"?");
		} else {
			var descrTxt = $("#descrBG").text();
			descrTxt = descrTxt.substr(0,descrTxt.indexOf(".")+1);
			descrTxt += " Change background to " + chosenBGPic + "?";
			$("#descrBG").text(descrTxt);
		}	
	} else {
		if(currPic==chosenPic){
			$("#changeLayout").css("display","none");
		}
		var descrTxt = $("#descrBG").text();
		$("#descrBG").text(descrTxt.substr(0,descrTxt.indexOf(".")+1));
	}
});

//for styling a picture that is clicked and adding text to show the chosen picture.
$(".profilePic").on("click",function(){
	$(".profilePic").css("border","none");
	$(this).css("border","5px solid #0AC2FF");

	chosenPic = $(this).attr("value");
	if(currPic!=chosenPic){
		$("#changeLayout").css("display","block");
		var currDescr = $("#descrPic").text();
		if(currDescr.indexOf("Change")==-1){
			$("#descrPic").text($("#descrPic").text()+" Change picture to " + chosenPic+"?");
		} else {
			var descrTxt = $("#descrPic").text();
			descrTxt = descrTxt.substr(0,descrTxt.indexOf(".")+1);
			descrTxt += " Change picture to " + chosenPic + "?";
			$("#descrPic").text(descrTxt);
		}	
	} else {
		if(currBGPic==chosenBGPic){
			$("#changeLayout").css("display","none");
		}
		var descrTxt = $("#descrPic").text();
		$("#descrPic").text(descrTxt.substr(0,descrTxt.indexOf(".")+1));
	}
});

//for finalizing the change layout, onclick on the submit button that will send this information to the server
$("#changeLayout").on("click",function(){
	if(chosenBGPic.length==0){
		chosenBGPic = currBGPic;
	}
	
	if(chosenPic.length==0){
		chosenPic = currPic;
	}
	
	if(chosenBGPic=="science"||chosenBGPic=="space"){chosenBGPic +=".jpg"}
	else if(chosenBGPic=="pirate"){chosenBGPic +=".png"}
	else if(chosenBGPic=="jungle"){chosenBGPic +=".jpeg"}

	chosenPic += ".jpg";

	var currLoc = window.location;
	$.post(currLoc+"/changeLayout", {
				chosenBGPic:chosenBGPic,
				chosenPic:chosenPic
			}, 
	    function(returnedData){
	    	window.location.reload();
	    }
	);
});

//
$("#sentencesQNav").on("click",function(){
	$("#modMenu").css("display","none");
	$("#sentenceQForm").css("display","block");
	$("#instrQ").text("Fill out all fields before clicking submit");
})
$("#goodSadQNav").on("click",function(){
	$("#modMenu").css("display","none");
	$("#GoodSadQForm").css("display","block");
	$("#instrQ").text("Fill out all fields before clicking submit");
})

$('#myQModal').on('hidden.bs.modal', function() {
	$("#modMenu").css("display","block");
	$("#sentenceQForm").css("display","none");
	$("#GoodSadQForm").css("display","none");
	$("#instrQ").text("Select Category that you want to add questions to.");
	formatInputs();
});

$("#sentenceSubmitQ").on("click",function(e){
	if($("#sentenceQInput").val().length==0 || $("#sentencecorrAnsInput").val().length==0 || $("#sentenceincorrAns1Input").val().length==0 || $("#sentenceincorrAns2Input").val().length==0){
		alert("enter all fields");
	} else if($("#sentencecorrAnsInput").val()==$("#sentenceincorrAns1Input").val() || $("#sentencecorrAnsInput").val()==$("#sentenceincorrAns2Input").val() || $("#sentenceincorrAns1Input").val()==$("#sentenceincorrAns2Input").val()){
		alert("enter unique answers for each choice field");
	} else {
		var question = $("#sentenceQInput").val();
		var group = $("#sentenceEmotionGroupSelect").val();
		var correctAns = $("#sentencecorrAnsInput").val();
		var incorrectAns = $("#sentenceincorrAns1Input").val();
		incorrectAns += ","+$("#sentenceincorrAns2Input").val();
		
		var currLoc = window.location;
		$.post(currLoc+"/addQ",{
			module:"sentence",
			question:question,
			group:group,
			correctAns:correctAns,
			incorrectAns:incorrectAns
		},function(newQ){

		});
		formatInputs();	
	}
})

$("#gsSubmitQ").on("click",function(e){
	if($("#gsQInput").val().length==0){
		alert("enter a question");
	} else {
		var question = $("#gsQInput").val();
		var topic = $("#gsTopicInput").val();

		var currLoc = window.location;
		$.post(currLoc+"/addQ",{
			module:"gs",
			question:question,
			topic:topic
		},function(newQ){

		});
		formatInputs();	
	}
})


$("#sentenceQInput").on("focus",function(e){focus(e,"#99BBEE","white","blue")});
$("#sentencecorrAnsInput").keyup("focus",function(e){focus(e,"#024034","white","#007024")});
$("#sentenceincorrAns1Input").keyup("focus",function(e){focus(e,"#C30000","white","#850000")});
$("#sentenceincorrAns2Input").keyup("focus",function(e){focus(e,"#C30000","white","#850000")});
$("#sentenceQInput").on("focusout",function(e){focusOut(e,"#99BBEE","white","blue")});
$("#sentencecorrAnsInput").keyup("focusout",function(e){focusOut(e,"#024034","white","#007024")});
$("#sentenceincorrAns1Input").keyup("focusout",function(e){focusOut(e,"#C30000","white","#850000")});
$("#sentenceincorrAns2Input").keyup("focusout",function(e){focusOut(e,"#C30000","white","#850000")});
$("#gsQInput").on("focus",function(e){focus(e,"#99BBEE","white","blue")});
$("#gsQInput").on("focusout",function(e){focusOut(e,"#99BBEE","white","blue")});

var focus = function(e,bgColor,color,borderColor){
	e.currentTarget.style.backgroundColor = bgColor;
	e.currentTarget.style.color = color;
	e.currentTarget.style.borderColor = borderColor;
}

var focusOut = function(e,bgColor,color,borderColor){

    if(e.currentTarget.value!=""){
    	e.currentTarget.style.backgroundColor = bgColor;
    	e.currentTarget.style.color = color;
    	e.currentTarget.style.borderColor = borderColor;
    } else {
    	e.currentTarget.style.backgroundColor = "#fff";
    	e.currentTarget.style.color = "black";
    	e.currentTarget.style.borderColor = "black";    	
    }

}

var formatInputs = function(){
	$("#sentenceQInput").val("");
	$("#sentenceEmotionGroupSelect option[value='positive']").prop("selected",true);
	$("#sentencecorrAnsInput").val("");
	$("#sentenceincorrAns1Input").val("");
	$("#sentenceincorrAns2Input").val("");
	$("#gsQInput").val("");
	$('#gsTopicInput').val("");
	$("#sentenceQInput").css("border-color","black");
	$("#sentencecorrAnsInput").css("border-color","black");
	$("#sentenceincorrAns1Input").css("border-color","black");
	$("#sentenceincorrAns2Input").css("border-color","black");
	$("#sentenceQInput").css("background-color","white");
	$("#sentencecorrAnsInput").css("background-color","white");
	$("#sentenceincorrAns1Input").css("background-color","white");
	$("#sentenceincorrAns2Input").css("background-color","white");
	$("#gsQInput").css("border-color","black");
	$("#gsQInput").css("background-color","white");
	$("#gsQInput").css("border-color","black");
	$("#gsQInput").css("background-color","white");
}

$("#switchToGS").on("click",function(){
	$("#sentenceQForm").css("display","none");
	$("#GoodSadQForm").css("display","block");	
})
$("#switchToSent").on("click",function(){
	$("#sentenceQForm").css("display","block");
	$("#GoodSadQForm").css("display","none");	
})
