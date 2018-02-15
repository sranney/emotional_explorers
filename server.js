//importing modules
var express = require("express");
var app = express();
var flash = require("connect-flash");

var passport = require("passport");

var session = require("express-session");
var bodyParser = require("body-parser");

var models = require("./models");
//setting up static file directory to serve
app.use(express.static("Public"));

var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret:"ourprojectisthebest",
	resave:true,
	saveUninitialized:true
}));
app.use(passport.initialize());//initialize passport
app.use(passport.session());

var port = process.env.PORT || 5000;//setting port

app.listen(port,function(err){//setting up server on port
	if(!err){
		console.log("site is live");
	} else {console.log(err);}
})

models.sequelize.sync().then(function(){//syncing databases
	console.log("success");
}).catch(function(err){
	console.log(err,"failure");
})

//setting up middleware for view templates
app.engine("handlebars", 
	exphbs({ 
		defaultLayout: "main",//setting up the layout template
		partialsDir:[__dirname+"/views/partials"]//setting up partials directory
	 }));
app.set("view engine","handlebars");//set the express view engine as handlebars

//authentication, credentials and session instantiation
require("./config/passport/passport.js")(passport,models.user,models.student,models.admin);

//routes
//for authentication - going from login/signup to home and putting all data retrieved from user into db
require("./routes/auth.js")(app,
							passport,
							models.user,
							models.student,
							models.admin);
//for admin side of site
require("./routes/admin.js")(app,
							models.student,
							models.admin,
							models.SentenceMatchingScores,
							models.PictureMatchingScores,
							models.GoodSadScores,
							models.sequelize,
							models.sentenceQuestions,
							models.questionImages,
							models.emotPrompts);
//for students - sentence matching module
require("./routes/sentenceRoutes.js")(app,
										models.sentenceQuestions,
										models.student,
										models.SentenceMatchingScores);
//for students - expression matching module
require("./routes/expressionRoutes.js")(app,
										models.questionImages,
										models.student,
										models.PictureMatchingScores);
//for students - good sad module
require("./routes/goodsadRoutes.js")(app,
									models.emotPrompts,
									models.student,
									models.GoodSadScores);
//for students - simply for changing students' home page layout
require("./routes/student.js")(app,
								models.student);