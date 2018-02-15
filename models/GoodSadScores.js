module.exports = function(sequelize,Sequelize){
	var GoodSadScores = sequelize.define("GoodSadScores",{
		student_id:{
			type:Sequelize.INTEGER,
			allowNull:false
		},
		goodSad:{
			type:Sequelize.STRING,
			allowNull:false
		},
		topic:{
			type:Sequelize.STRING,
		},			
		question:{
			type:Sequelize.STRING,
			allowNull:false
		},
		answer:{
			type:Sequelize.STRING,
			allowNull:false
		}
	});
	
	return GoodSadScores;
}