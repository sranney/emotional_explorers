//routes

//Fisher-Yates shuffle method - https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = function(app, questions,Student,PromptsAnswered) {

	//get data for the good-sad module for the student to work on
	app.get('/goodSad', function(req, res){
		//get the student info for user, so that both standard questions and the questions that were written by the student's admin connections can be returned later in this function
		//the reason why I need to do this here is because req.user does not contain the same data that is in the student table, including adminConn -> that is only in the student table
		Student.findOne({where:{email:req.user.email}}).then(function(student){
			//admin connection
			var adminConn = student.dataValues.adminConn;
			//get the prompts already answered by the student			
			PromptsAnswered.findAll({where:{student_id:student.dataValues.id}}).then(function(studentPrompts){
				//get just the ids of the questions
				var PromptsAsked = studentPrompts.map((question)=>{//question ids for the questions already answered
					return question.dataValues.question;
				});
				//set message color and message - unless there is no or one more prompt left, there are no correct/incorrect answers in this module, so the message will always be the following
				var Msg = "Here's the next prompt!"
				var msgColor = "#2FA4DA";					

				//select * from questions where id not in the ids of the questions already asked as computed above
				questions.findAll({where:{
					$and:{
						id:{$notIn:PromptsAsked},
						from:{$in:["standard",adminConn]}//get standard prompts as well as prompts written by the student's admin
					}
				}}).then(function(remainingPrompts){

					if(remainingPrompts.length>0){
						//if the remaining num prompts unanswered is greater than 0, then do the following

						//set msg depending on num prompts left
						Msg=remainingPrompts.length==1? "Here's the last prompt!":"Here's the next prompt!";
						//get a random prompt from the prompts left
						var randPromptIndx = Math.floor(Math.random()*remainingPrompts.length);
						var questionPrompt = remainingPrompts[randPromptIndx].dataValues;
						var qID = questionPrompt.id;
						var qNum = PromptsAsked.length+1;
						//render good sad module with this information
						res.render("goodsadModule",{
							noMoreQuestions:false,
							promptText:questionPrompt.question,//question set as promptText
							goodsadModule:true,
							moduleGame:"Good Sad",
							firstName:student.dataValues.firstname,//firstname of user
							qID:qID,
							qNum:qNum,
							Msg:Msg,
							msgColor:msgColor,
							student:true,
							chosenBackground:student.dataValues.chosenBackground});//background chosen by user
					} else {
						//if no questions remaing, render the module with a message stating this
						res.render("goodsadModule",{
							noMoreQuestions:true,
							Msg:"You have answered all questions available to you. Please tell your parents to get more questions added.",
							msgColor:"blue",
							firstName:student.dataValues.firstname,
							goodsadModule:true,
							moduleGame:"Good Sad",
							student:true,
							chosenBackground:student.dataValues.chosenBackground
						});
					}
				});
			})
		});
	});

	//for posting answers to server for this module
	app.post("/goodSad/goodsad_submit",function(req,res){
		//question id for question answered
		var qID = parseInt(req.body.id);
		//get student information by searching email
		Student.findOne({where:{email:req.user.email}}).then(function(student){
			//get actual question of question answered by looking up qid
			questions.findOne({where:{id:qID}}).then(function(question){
				//push new question answered PromptsAnswered table
				PromptsAnswered.create({
					student_id: student.dataValues.id,
					goodSad: req.body.goodSad,
					topic:question.dataValues.topic,
					question:question.dataValues.id,
					answer: req.body.answer,
				}).then(function(data){
					//update recent activity for student
					var recentActivity = {mostRecentActivity:"goodsad module"};
					Student.update(recentActivity,{where:{id:student.id}}).then(function(result){
						res.end();
					});
				});
			});
		});
	});

}
