//routes

//Fisher-Yates shuffle method - https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element at random…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = function(app, questions,Student,Scores) {

	//get the expression question module for student
	app.get('/expressions', function(req, res){
		//get the current user's current module status so that they can pick up where they left off
		Student.findOne({where:{email:req.user.email}}).then(function(student){
			//adminConn is the email of their admin connection - get this so that I can retrieve their admin's created questions as well
			var adminConn = student.dataValues.adminConn;
			
			//now getting scores for this student (based on email) for this module in order to:
			//1)get correct remaining questions, 
			//2) determine whether the user got the last questions answered correctly
			Scores.findAll({where:{student_id:student.dataValues.id}}).then(function(studentScores){
				//make array of question ids that have already been asked
				//getting this from returned Scores data	
				var questionsAsked = studentScores.map((question)=>{
					return question.dataValues.question;//id is question
				});
				//have any questions been asked
				if(studentScores.length>0){
					//if so determine whether the last question answered by student was answered correctly or not
					var lastQCorrect = studentScores[studentScores.length-1].dataValues.correct;
					//show message for result of last question
					var Msg = lastQCorrect>0? "Great job! You got the last question you answered correct!" : "Alright, good effort! Unfortunately, you didn't get the last question you answered correct!";
					//color that message
					var msgColor = lastQCorrect>0? "green":"red";
				} else {
					//if no questions have been asked, show good luck message
					var Msg = "Good luck!"
					//color for that message
					var msgColor = "#2FA4DA";					
				}
				//now getting questions that haven't been answered by student
				questions.findAll({where:{
					$and:{
						id:{$notIn:questionsAsked},//where id not in the questions Asked id array
						from:{$in:["standard",adminConn]}//get questions both that are standard and are just from the student's admin
					}
				}}).then(function(remainingQs){
					//how many questions left?
					if(remainingQs.length>0){
						//if 1 or more, then do this
						
						//determine if 1 question remains, if so add to message
						Msg+=remainingQs.length>1? "":" Here's the last question! Good luck!";
						//get a random question from the remaining questions
						var randQ = Math.floor(Math.random()*remainingQs.length);
						var questionData = remainingQs[randQ].dataValues;
						var qID = questionData.id;
						var qNum = questionsAsked.length+1;
						//get the question's incorrect answers and correct answer and push them all into an array
						var answerArr = questionData.incorrectAnswers.split(",");
						answerArr.push(questionData.correctAnswer);
						//shuffle the answer choices so that when the user goes to answer the question, it is not always A, B or C on each question, but changes
						answerArr = shuffle(answerArr);
						//render page with data
						res.render("expressionModule",{
							noMoreQuestions:false,
							choices:answerArr,//incorrect and correct answer choices
							imageSource:questionData.imageSource,//this is an image question module, so get the image sources
							expressionModule:true,
							moduleGame:"Expression Matching",
							firstName:student.dataValues.firstname,
							qID:qID,
							qNum:qNum,
							Msg:Msg,
							msgColor:msgColor,
							student:true,
							chosenBackground:student.dataValues.chosenBackground//student's chosen background
						});
					} else {
						//if there are no more questions for the student then render expressionModule with a message stating that there are no more questions to be answered
						res.render("expressionModule",{
							noMoreQuestions:true,
							Msg:"You have answered all questions available to you. Please tell your parents to get more questions added.",
							msgColor:"blue",
							firstName:student.dataValues.firstname,
							expressionModule:true,
							moduleGame:"Expression Matching",
							student:true,
							chosenBackground:student.dataValues.chosenBackground
						});
					}
				});
			});
		});
	});

	//route that students post answers to 
	app.post("/expressions/expression_submit",function(req,res){
		//get id of question
		var qID = parseInt(req.body.id);
		//get student data
		Student.findOne({where:{email:req.user.email}}).then(function(student){
			//get question with the question id of the question answered by student to check the answer provided by student
			questions.findOne({where:{id:qID}}).then(function(question){
				//correct answer
				var correctAnswer = question.dataValues.correctAnswer;
				//determine result
				var result = correctAnswer==req.body.chosenAns? 1:0;
				//push into scores table, the results for this question for this specific student
				Scores.create({
					student_id: student.dataValues.id,
					emotion_group:question.dataValues.emotion_group,
					emotion:question.dataValues.correctAnswer,
					question:question.dataValues.id,
					correct:result,
					guessedAnswer:req.body.chosenAns
				}).then(function(data){
					//finally update the recent activity for the student to state that the activity was answering a question in the expression module
					var recentActivity = {mostRecentActivity:"expression module"};
					Student.update(recentActivity,{where:{id:student.id}}).then(function(result){
						res.end();
					});
				});
			});
		});
	});

}
