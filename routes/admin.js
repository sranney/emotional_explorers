var bCrypt = require("bcrypt-nodejs");//secures passwords
var isValidAccessKey = function(userAccessKey,accessKey){//function that will make sure that the entered password is the correct password for the user
	return bCrypt.compareSync(accessKey,userAccessKey);
	//passes password through same encrypting method and determines if provided password is the same as that in the database
	//returns true if they are the same and false if they are different
}

module.exports=function(app,students,admins,SentenceMatchingScores,PictureMatchingScores,GoodSadScores,sequelize,sentenceQDB,pictureQDB,gsQDB){
	
	//function for handling new questions from admin
	var newQuestion = function(req,res){
		//handles two different types of questions - sentence questions
		if(req.body.module=="sentence"){
			sentenceQDB.create({//insert into database
				questionText:req.body.question,
				correctAnswer:req.body.correctAns,
				incorrectAnswers:req.body.incorrectAns,
				emotion_group:req.body.group,
				from:req.user.email//to make sure only this admin's students receive these questions
			}).then(function(data){res.send("Question added successfully");
			}).catch(function(data){res.send("Error in adding question")});
		} else {
			//good sad questions
			gsQDB.create({
				question:req.body.question,
				topic:req.body.topic,
				from:req.user.email
			}).then(function(data){res.send("Question added successfully");
			}).catch(function(data){res.send("Error in adding question")});
		}
	
	}
	app.post("/search",function(req,res){//for searching for students in the database
		//first find all students that the admin is currently connected with - find this by looking up students that have the admin's email in their sql record
		students.findAll({where:{adminConn:req.user.email}}).then(function(adminStudents){
			//push selected information into an object that will ultimately be sent back in a res.render function
			var studentDisplayInfo = adminStudents.map(function(adminStudent,indx){
				return {
					id:indx,
					firstname:adminStudent.dataValues.firstname,
					lastname:adminStudent.dataValues.lastname,
					age:adminStudent.dataValues.age,
					grade:adminStudent.dataValues.grade,
					email:adminStudent.dataValues.email
				}
			});
			//then find the student that the admin is looking for by the student's email
			students.findOne({where:{email:req.body.email}}).then(function(student){
				
				if(!student){//if returned data student is falsy, then state that the student is not in the system
					res.render("home_admin",{error:"student email not in the system",firstname:req.user.firstname||req.body.firstname,students:studentDisplayInfo,homePage:true});
				} else {
					if(student.adminConn === null){	//if there is no admin connection for the student yet, 
						if(!isValidAccessKey(student.accessKey,req.body.accessKey)){//then check whether the access key provided by the admin is correct						
							//if it is not a valid access key return that the access key was not correct
							res.render("home_admin",{error:"access key for this student is not correct",firstname:req.user.firstname||req.body.firstname,students:studentDisplayInfo,homePage:true})
						} else {
							//if it is a correct access key then connect the student with the admin and add this student's information to studentDisplayInfo as one of the admin's students
							studentDisplayInfo.push({
								id:studentDisplayInfo.length,
								firstname:student.dataValues.firstname,
								lastname:student.dataValues.lastname,
								age:student.dataValues.age,
								grade:student.dataValues.grade,
								email:student.dataValues.email
							})
							//update the student's information in the db to connect them with the admin
							var adminEmail = {adminConn: req.user.email};
							students.update(adminEmail,{where:{id:student.id}}).then(function(result){
								res.render("home_admin",{success:"you have been successfully connected to the student",firstname:req.user.firstname||req.body.firstname,students:studentDisplayInfo,validAdmin:true,homePage:true})
							});
						}
					} else {//if the student is already connected with an admin then return a statement detailing that
						res.render("home_admin",{error:"student is already connected to an admin",firstname:req.user.firstname||req.body.firstname,students:studentDisplayInfo,homePage:true});
					}
				}
			})
		})
	});

	//when an admin goes to a "/studentProfile-:id" url, find that admin's student with that "id" and return data regarding student's performance
	app.get("/studentProfile-:id",function(req,res){

		//first find all students connected with the admin
		var studentDisplayInfo;
		students.findAll({where:{adminConn:req.user.email}}).then(function(adminStudents){
			studentDisplayInfo = adminStudents.map(function(adminStudent,indx){//map the data to an object array that will make getting the correct student and their info easy
				return {
					id:adminStudent.dataValues.id,
					firstname:adminStudent.dataValues.firstname,
					lastname:adminStudent.dataValues.lastname,
					age:adminStudent.dataValues.age,
					grade:adminStudent.dataValues.grade,
					email:adminStudent.dataValues.email,
					recentActivity:adminStudent.dataValues.mostRecentActivity,
					recentActivityTime:adminStudent.dataValues.updatedAt
				}
			});
			var studentProfile = studentDisplayInfo[req.params.id];//filter down the correct student by the id in the url and set studentProfile to that student
			if(studentProfile){//if studentProfile is truthy (there is a student at that index), then do the following
				//these pages have buttons that allow for easily navigating each student that an admin has
				//in order to determine what buttons to put on a page, firstStudent and lastStudent are passed and used
				studentProfile.firstStudent = req.params.id==0? true:false;
				studentProfile.lastStudent = req.params.id==studentDisplayInfo.length-1? true:false;
				studentProfile.lastindx = studentDisplayInfo.length-1;
				//find all scores that the student the admin is viewing have 
				//first the scores for sentence matching
				SentenceMatchingScores.findAll({
					where:{student_id:studentProfile.id},
					//aggregate these scores and use the count function to get aggregate returned data
					group:["SentenceMatchingScores.emotion_group","SentenceMatchingScores.emotion","SentenceMatchingScores.correct"],
					attributes: ["emotion_group","emotion","correct",[sequelize.fn('COUNT', sequelize.col('emotion')), 'NumEmotionQuestions']]
				}).then(function(results_sentence){
					//further aggregate by correct answers
					studentProfile.sentence_correct = results_sentence.filter((result)=>{
						return (result.correct==1);
					});
					//then aggregate by incorrect answers
					studentProfile.sentence_incorrect = results_sentence.filter((result)=>{
						return (result.correct==0);
					});
					//some additional stats computations
					studentProfile.sentence_numCorrect = studentProfile.sentence_correct.length;
					studentProfile.sentence_totalAnswered = studentProfile.sentence_numCorrect+studentProfile.sentence_incorrect.length;
					studentProfile.sentence_percCorrect = (Math.round((studentProfile.sentence_numCorrect/studentProfile.sentence_totalAnswered)*10000)/100)+"%";
					studentProfile.sentences_hasCorrectAnswers = studentProfile.sentence_correct.length>0;
					studentProfile.sentences_hasIncorrectAnswers = studentProfile.sentence_incorrect.length>0;
					studentProfile.sentences_hasAnswers = results_sentence.length>0;
					//get all the emotion groups of the questions answered by the user
					var Emots = results_sentence.map((result,indx)=>{
						return result.emotion;
					});
					//get a unique array of these emotions
					var uniqEmots = Emots.filter((Emot,indx)=>{
						return Emots.indexOf(Emot)==indx;
					});
					//compute percents and counts for each of these unique emotions
					var emotCounts = [];
					for (var i = 0 ; i < uniqEmots.length ; i++){
						emotCounts[i]={};
						emotCounts[i].emot = uniqEmots[i];
						emotCounts[i].emotGroup = results_sentence.filter((result)=>{
							return (result.emotion == uniqEmots[i]);
						});
						emotCounts[i].emotGroup = emotCounts[i].emotGroup[0].dataValues.emotion_group;
						emotCounts[i].numCorrect = studentProfile.sentence_correct.filter((result)=>{
							return (result.emotion == uniqEmots[i]);
						});
						emotCounts[i].numCorrect = emotCounts[i].numCorrect.length>0? emotCounts[i].numCorrect[0].dataValues.NumEmotionQuestions:0;
						emotCounts[i].numIncorrect = studentProfile.sentence_incorrect.filter((result)=>{
							return (result.emotion == uniqEmots[i]);
						});
						emotCounts[i].numIncorrect = emotCounts[i].numIncorrect.length>0? emotCounts[i].numIncorrect[0].dataValues.NumEmotionQuestions:0;						
						emotCounts[i].numTotal = emotCounts[i].numIncorrect+emotCounts[i].numCorrect;
						emotCounts[i].percCorrect = (Math.round((emotCounts[i].numCorrect/emotCounts[i].numTotal)*10000)/100)+"%";
					}
					//add this to the data that will be used to render the page for the particular student
					studentProfile.dataForTotalsTable_sentences = emotCounts;
					//do the same stuff for the picture matching module, to return the same aggregate scores
					PictureMatchingScores.findAll({
						where:{student_id:studentProfile.id},
						//aggregate these scores and use the count function to get aggregate returned data
						group:["PictureMatchingScores.emotion_group","PictureMatchingScores.emotion","PictureMatchingScores.correct"],
						attributes: ["emotion_group","emotion","correct",[sequelize.fn('COUNT', sequelize.col('emotion')), 'NumEmotionQuestions']]
					}).then(function(results_picture){
						//get correct and incorrect answers separated into two arrays
						studentProfile.picture_correct = results_picture.filter((result)=>{
							return (result.correct==1);
						});
						studentProfile.picture_incorrect = results_picture.filter((result)=>{
							return (result.correct==0);
						});
						//get unique emotions that the student has answered for this module
						var Emots = results_picture.map((result,indx)=>{
							return result.emotion;
						});
						var uniqEmots = Emots.filter((Emot,indx)=>{
							return Emots.indexOf(Emot)==indx;
						})
						//get some stats on the student's answers
						studentProfile.picture_numCorrect = studentProfile.picture_correct.length;
						studentProfile.picture_totalAnswered = studentProfile.picture_numCorrect+studentProfile.picture_incorrect.length;
						studentProfile.picture_percCorrect = (Math.round((studentProfile.picture_numCorrect/studentProfile.picture_totalAnswered)*10000)/100)+"%";						
						studentProfile.picture_hasCorrectAnswers = studentProfile.picture_correct.length>0;
						studentProfile.picture_hasIncorrectAnswers = studentProfile.picture_incorrect.length>0;
						studentProfile.picture_hasAnswers = results_picture.length>0;
						//compute percents and counts for each of these unique emotions
						var emotCounts = [];
						for (var i = 0 ; i < uniqEmots.length ; i++){
							emotCounts[i]={};
							emotCounts[i].emot = uniqEmots[i];
							emotCounts[i].emotGroup = results_picture.filter((result)=>{
								return (result.emotion == uniqEmots[i]);
							});
							emotCounts[i].emotGroup = emotCounts[i].emotGroup[0].dataValues.emotion_group;
							emotCounts[i].numCorrect = studentProfile.picture_correct.filter((result)=>{
								return (result.emotion == uniqEmots[i]);
							});
							emotCounts[i].numCorrect = emotCounts[i].numCorrect.length>0? emotCounts[i].numCorrect[0].dataValues.NumEmotionQuestions:0;
							emotCounts[i].numIncorrect = studentProfile.picture_incorrect.filter((result)=>{
								return (result.emotion == uniqEmots[i]);
							});
							emotCounts[i].numIncorrect = emotCounts[i].numIncorrect.length>0? emotCounts[i].numIncorrect[0].dataValues.NumEmotionQuestions:0;						
							emotCounts[i].numTotal = emotCounts[i].numIncorrect+emotCounts[i].numCorrect;
							emotCounts[i].percCorrect = (Math.round((emotCounts[i].numCorrect/emotCounts[i].numTotal)*10000)/100)+"%";
						}
						studentProfile.dataForTotalsTable_picture = emotCounts;
						//get aggregate data on the answers the students provide for the good sad module
						GoodSadScores.findAll({
							where:{student_id:studentProfile.id},
							group:["GoodSadScores.goodSad","GoodSadScores.topic"],
							attributes: ["goodSad","topic",[sequelize.fn('COUNT', sequelize.col('topic')), 'NumTopicQuestions']]
						}).then(function(results_gs){
							studentProfile.results_gs = results_gs.map(function(result){
								if(result.dataValues.topic.indexOf(",")==-1){
									return result.dataValues;
								} else {
									result.dataValues.topic = result.dataValues.topic.replace(/, /g,",");
									return result.dataValues;
								}

							});
							studentProfile.gs_hasAnswers = studentProfile.results_gs.length>0?true:false;
							studentProfile.showInfo = true;
							studentProfile.adminObs = true;
							//ultimately return all of this aggregate data for the admin's student at the specified id
							res.render("StudentProfile_admin",studentProfile);
						});
					});
				});
			} else {
				//if the index is outside the range of the ids of the admin, then return this
				res.render("StudentProfile_admin",{error:"student not found"});
			}
		});
	});

	//when a "dig deeper" button is clicked this will send an http get request to the server for more information on a particular emotional group
	//this function is ran on the server and returns data back to the client containing the particular question and answer provided by the student
	app.get("/studentProfile-:id/:quizType-:category-:result",function(req,res){
		//id in the url is particular to the admin, so find all of the students that are connected to the admin and then drilldown from there
		students.findAll({where:{adminConn:req.user.email}}).then(function(studentList){
			var studentData = studentList[req.params.id].dataValues;
			var correct = req.params.result=="correct"? 1:0;
			//then drilldown into the quiz type parameter and find the particular information for the student
			if(req.params.quizType=="sentences"){
				SentenceMatchingScores.findAll({//retrieve the data for this student, for this emotion and the score result that is being asked for
					where: {$and: [
						{student_id:studentData.id},
						{emotion:req.params.category},
						{correct:correct}
						]}
				}).then(function(data){//now organize the data to be returned to the client
					var results = data.map((dataItem)=>{
						return dataItem.dataValues;
					})
					var qIDs = results.map((result)=>{//one last thing to do: get the question material from sentenceQDB regarding the questions that are to be returned
						return result.question;
					})
					
					//filter formation - use $in if more than one question and use $eq if just one question
					var query = qIDs.length >1 ? {where:{id:{$in:qIDs}}} : {where:{id:{$eq:qIDs[0]}}};
					sentenceQDB.findAll(query).then(function(questions){//retrieve the data using that query
						questions = questions.map((question)=>{
							return question.dataValues;
						});
						for (var i = 0 ; i< results.length ; i++){
							results[i].questionText = questions.filter((question)=>{
								return question.id == qIDs[i];
							})[0].questionText;
							results[i].type="sentence";
						}
						res.json(results);//send the results back to the client
					})
				})
			} else if(req.params.quizType=="picture"){//if the quiz type of the emotion the admin is analyzing is for the emotion matching picture module
				PictureMatchingScores.findAll({//find all the particular student's answers for the picture matching module that match the particular emotion category and the particular result
					where: {$and: [
						{student_id:studentData.id},
						{emotion:req.params.category},
						{correct:correct}
						]}
				}).then(function(data){
					var results = data.map((dataItem)=>{//organize the data to be returned
						return dataItem.dataValues;
					})
					var qIDs = results.map((result)=>{
						return result.question;
					})
					
					//then get additional data pertaining to the set of questions that the student answered that fit the particular criteria being searched for
					var query = qIDs.length >1 ? {where:{id:{$in:qIDs}}} : {where:{id:{$eq:qIDs[0]}}};
					pictureQDB.findAll(query).then(function(questions){
						questions = questions.map((question)=>{
							return question.dataValues;
						});
						for (var i = 0 ; i< results.length ; i++){
							results[i].imageSource = questions.filter((question)=>{
								return question.id == qIDs[i];
							})[0].imageSource;
							results[i].type="picture";
						}
						res.json(results);//return the data
					})
				})
			} else if(req.params.quizType=="gs"){//for the good sad journal module
				var goodSad = req.params.result;
				req.params.category = req.params.category.replace(/,/,", ");
				
				//get all the data for the questions answered by the particular student for this module that match the emotion that is being searched for 
				GoodSadScores.findAll({
					where: {$and: [
						{student_id:studentData.id},
						{topic:req.params.category},
						{goodSad:goodSad}
						]}
				}).then(function(data){
					//organizing returned data					
					var results = data.map((dataItem)=>{
						return dataItem.dataValues;
					})
					var qIDs = results.map((result)=>{
						return result.question;
					})
					
					//get additional data from the question module database to be returned back with the student's results
					var query = qIDs.length >1 ? {where:{id:{$in:qIDs}}} : {where:{id:{$eq:qIDs[0]}}};
					gsQDB.findAll(query).then(function(questions){
						questions = questions.map((question)=>{
							return question.dataValues;
						});
						for (var i = 0 ; i< results.length ; i++){
							results[i].questionText = questions.filter((question)=>{
								return question.id == qIDs[i];
							})[0].question;
							results[i].type="gs";
						}
						res.json(results);//return the data to the client
					})
				})				
			}
		});
	});
	
	//for posting new questions for an admin's students
	app.post("/home/addQ",newQuestion);
	app.post("/search/addQ",newQuestion);

}