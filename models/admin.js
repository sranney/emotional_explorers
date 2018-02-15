module.exports = function(sequelize,Sequelize){
	var Admin = sequelize.define("admin",{
		firstname:{
			type:Sequelize.STRING,
			allowNull:false
		},
		lastname:{
			type:Sequelize.STRING,
			allowNull:false
		},			
		email:{
			type:Sequelize.STRING,
			allowNull:false,
			unique:true,
			validate:{
				isEmail:true,
			}
		}
	});
	
	return Admin;
}