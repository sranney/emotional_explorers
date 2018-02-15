module.exports = function(app,passport,User,Student,Admin){
	
	app.get("/",function(req,res){//get signup page
		res.render("signup",{homePage:true});
	});

	app.get("/login",function(req,res){//get log in page
		res.render("login",{homePage:true});
	});

	//in case the user tries to access home page without having logged in, isLoggedIn redirects the user to the loging page
	app.get("/home", isLoggedIn,function(req,res){
		if(req.user.userType=="Student"){//return home page for student in case req.user which is filled by passport as session data shows that the user is type student
			Student.findOne({where:{email:req.user.email}}).then(function(userData){//get data from the database regarding this particular student
				var userData = userData.dataValues;
				userData.student = true;
				userData.homePage = true;
				userData.BGPicName = userData.chosenBackground.substr(0,userData.chosenBackground.indexOf("."));
				userData.PicName = userData.chosenPicture.substr(0,userData.chosenPicture.indexOf("."));
				res.render("home_student",userData);//req.user will exist if the current user is logged in
			});
		} else {//else return the admin page
			Student.findAll({where:{adminConn:req.user.email}}).then(function(students){//and find all the students that are currently connected to that admin
				var studentDisplayInfo = students.map(function(adminStudents,indx){
					return {
						id:indx,
						firstname:adminStudents.dataValues.firstname,
						lastname:adminStudents.dataValues.lastname,
						age:adminStudents.dataValues.age,
						grade:adminStudents.dataValues.grade,
						email:adminStudents.dataValues.email
					}
				})
				Admin.findOne({where:{email:req.user.email}}).then(function(userData){//and find the admin that has logged in
					var userData = userData.dataValues;
					userData.students = studentDisplayInfo;
					userData.validAdmin = userData.students.length>0? true:false;
					userData.numStudents = studentDisplayInfo.length;
					userData.student = false;
					userData.homePage = true;
					res.render("home_admin",userData);//render the admin home page with the data collected here
				});
			});
		}	
	});

	app.get("/logout",function(req,res){//destroy session data when logged out
		req.session.destroy(function(err){
			res.redirect("/");
		})
	})

	app.get("/signuperror",function(req,res){//show that there was some type of auth error
		res.render("signup",{message:"authentication failed",hasErrors:true});
	})

	app.post("/login",passport.authenticate("local-signin",{//use passport strategy for signing in 
		successRedirect: "/home",
		failureRedirect: "/signuperror"
	}));

	app.post("/signup",passport.authenticate("local-signup",{//use passport strategy for signing up 
		successRedirect: "/home",
		failureRedirect: "/signuperror"
	}));

	function isLoggedIn(req,res,next){//method for checking auth status and redirecting if necessary 
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
	}

}

