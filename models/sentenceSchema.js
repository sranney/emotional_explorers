module.exports = function(sequelize, Sequelize){
	var sentenceQuestions = sequelize.define("sentenceQuestions", {
		questionText: {
			type: Sequelize.STRING,
			allowNull: false
		}, 
		correctAnswer: {
			type: Sequelize.STRING,
			allowNull: false
		},
		incorrectAnswers: {
			type: Sequelize.STRING,
			allowNull: false
		},
		emotion_group: {
			type: Sequelize.STRING, 
			allowNull: false
		},
    from:{
      type:Sequelize.STRING,
      defaultValue:"standard"
    }
	});


/*sentenceQuestions.bulkCreate([{
  questionText: "I am lying down, listening to my favorite song. Everything is peaceful and quiet. I feel…",
  correctAnswer: "calm",
  incorrectAnswers: "bored, sad",
  emotion_group: "neutral"
}, {
  questionText: "I did not know that my brother was coming to my recital! I feel …",
  correctAnswer: "surprised",
  incorrectAnswers: "excited, angry",
  emotion_group: "positive"
}, {
  questionText: "I just finished all of my work for the day. I feel…",
  correctAnswer: "relaxed",
  incorrectAnswers: "confused, concerned",
  emotion_group: "neutral"
}, {
  questionText: "My friend has not called me back all day. He should have arrived home by now. I feel …",
  correctAnswer: "concerned",
  incorrectAnswers: "disappointed, nervous",
  emotion_group: "negative"
}, {
  questionText: "I made a D on the test, but I studied so hard. I feel …",
  correctAnswer: "disappointed",
  incorrectAnswers: "angry, concern",
  emotion_group: "negative"
}, {
  questionText: "I have been listening to the teacher’s lecture for 2 hours. I feel …",
  correctAnswer: "bored",
  incorrectAnswers: "confused, relaxed",
  emotion_group: "neutral"
}, {
  questionText: "Leslie and I were supposed to go to the mall together, but she went with Susan instead. I feel …",
  correctAnswer: "hurt",
  incorrectAnswers: "angry, surprised",
  emotion_group: "negative"
}, {
  questionText: "My mom just gave me the best birthday present! I feel …",
  correctAnswer: "happy",
  incorrectAnswers: "surprised, excited",
  emotion_group: "positive"
}, {
  questionText: "I do not understand this job assignment at all. I feel …",
  correctAnswer: "confused",
  incorrectAnswers: "disappointed, angry",
  emotion_group: "negative"
}, {
  questionText: "My mom and I got in a big fight and now I cannot go to the movies after school. I feel …",
  correctAnswer: "upset",
  incorrectAnswers: "disappointed, hurt",
  emotion_group: "negative"
}, {
  questionText: "My dog Max died last week. I feel …",
  correctAnswer: "sad",
  incorrectAnswers: "afraid, upset",
  emotion_group: "negative"
}, {
  questionText: "I have to give a presentation in front of the entire class. My hands are shaking. I feel …",
  correctAnswer: "nervous",
  incorrectAnswers: "afraid, excited",
  emotion_group: "negative"
}, {
  questionText: "That guy keeps bumping into me in the hallway and he makes really rude comments. I feel …",
  correctAnswer: "angry",
  incorrectAnswers: "disgusted, sad",
  emotion_group: "negative"
}, {
  questionText: "My class just won a pizza party for selling the most tickets! I feel …",
  correctAnswer: "excited",
  incorrectAnswers: "happy, surprised",
  emotion_group: "positive"
}, {
  questionText: "I just heard a loud noise outside my window! I feel …",
  correctAnswer: "afraid",
  incorrectAnswers: "nervous, confused",
  emotion_group: "negative"
}, {
  questionText: "This bathroom is really dirty and I don’t want to touch anything in here. I feel…",
  correctAnswer: "disgusted",
  incorrectAnswers: "nervous, concerned",
  emotion_group: "negative"
}]).then(function(data){});
*/	return sentenceQuestions;
}