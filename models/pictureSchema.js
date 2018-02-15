module.exports = function(sequelize, Sequelize){
  
	var questionImages = sequelize.define("questionImages", {
		imageSource: {
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

/*questionImages.bulkCreate([{
  imageSource: "afraid1.jpg",
  correctAnswer: "afraid",
  incorrectAnswers: "scared, concerned",
  emotion_group: "negative"
}, {
  imageSource: "bored1.jpg",
  correctAnswer: "bored",
  incorrectAnswers: "relaxed, concerned",
  emotion_group: "neutral"
}, {
  imageSource: "concerned1.jpg",
  correctAnswer: "concerned",
  incorrectAnswers: "upset, angry",
  emotion_group: "negative"
}, {
  imageSource: "disappointed1.jpg",
  correctAnswer: "disappointed",
  incorrectAnswers: "nervous, bored",
  emotion_group: "negative"
}, {
  imageSource: "excited1.jpg",
  correctAnswer: "excited",
  incorrectAnswers: "happy, surprised",
  emotion_group: "positive"
}, {
  imageSource: "hurt1.png",
  correctAnswer: "hurt",
  incorrectAnswers: "angry, disappointed",
  emotion_group: "negative"
}, {
  imageSource: "relaxed1.jpg",
  correctAnswer: "relaxed",
  incorrectAnswers: "surprised, concerned",
  emotion_group: "neutral"
}, {
  imageSource: "surprised1.jpg",
  correctAnswer: "surprised",
  incorrectAnswers: "disappointed, excited",
  emotion_group: "positive"
}, {
  imageSource: "angry1.jpg",
  correctAnswer: "angry",
  incorrectAnswers: "hurt, concerned",
  emotion_group: "negative"
}, {
  imageSource: "calm1.jpg",
  correctAnswer: "calm",
  incorrectAnswers: "disappointed, bored",
  emotion_group: "neutral"
}, {
  imageSource: "confused1.jpg",
  correctAnswer: "confused",
  incorrectAnswers: "nervous, disgusted",
  emotion_group: "negative"
},
{
  imageSource: "disgusted1.jpg",
  correctAnswer: "disgusted",
  incorrectAnswers: "angry, hurt",
  emotion_group: "negative"
}, {
  imageSource: "happy1.jpg",
  correctAnswer: "happy",
  incorrectAnswers: "excited, surprised",
  emotion_group: "positive"
}, {
  imageSource: "nervous1.jpg",
  correctAnswer: "nervous",
  incorrectAnswers: "disappointed, upset",
  emotion_group: "negative"
}, {
  imageSource: "sad1.jpg",
  correctAnswer: "sad",
  incorrectAnswers: "angry, disappointed",
  emotion_group: "negative"
}, {
  imageSource: "upset1.jpg",
  correctAnswer: "upset",
  incorrectAnswers: "angry, hurt",
  emotion_group: "negative"
}]).then(function(data){});
*/
	return questionImages;
}