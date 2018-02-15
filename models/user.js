module.exports = function(sequelize,Sequelize){
	var User = sequelize.define("user",{
		email:{
			type:Sequelize.STRING,
			allowNull:false,
			unique:true,
			validate:{
				isEmail:true
			}
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false
		},		
		userType:{
			type:Sequelize.STRING,
			allowNull:true
		},
		firstname:{
			type:Sequelize.VIRTUAL(Sequelize.STRING,["firstname"]),
			allowNull:false,
			validate:{
				isLength: [1]
			}
		},
		lastname:{
			type:Sequelize.VIRTUAL(Sequelize.STRING,["lastname"]),
			allowNull:false,
			validate:{
				isLength: [1]
			}
		},
		age:{
			type:Sequelize.VIRTUAL(Sequelize.INTEGER,["age"]),
			allowNull:false,
			validate:{
				isInt:true,
				min:0,
				max:18
			}
		},
		grade:{
			type:Sequelize.VIRTUAL(Sequelize.INTEGER,["grade"]),
			allowNull:false,
			validate:{
				isInt:true,
				min:0,
				max:12
			}
		},
		accessKey:{
			type:Sequelize.VIRTUAL(Sequelize.TEXT,["accessKey"]),
			allowNull:false			
		},
		about:{
			type:Sequelize.VIRTUAL(Sequelize.TEXT,["accessKey"]),
			validate:{
				isLength: [1, 250]
			}
		},		
	});
	return User;
};