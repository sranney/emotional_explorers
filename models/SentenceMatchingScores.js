module.exports = function(sequelize,Sequelize){
	var SentenceMatchingScores = sequelize.define("SentenceMatchingScores",{
		student_id:{
			type:Sequelize.INTEGER,
			allowNull:false
		},
		emotion_group:{
			type:Sequelize.STRING,
			allowNull:false
		},			
		emotion:{
			type:Sequelize.STRING,
			allowNull:false
		},
		question:{//question id
			type:Sequelize.INTEGER,
			allowNull:false
		},
		correct:{
			type:Sequelize.INTEGER,
			allowNull:false
		},
		guessedAnswer:{
			type:Sequelize.STRING,
			allowNull:false
		}
	});


	return SentenceMatchingScores;
}