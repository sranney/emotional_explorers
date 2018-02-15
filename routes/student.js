module.exports = function(app,students){

	//simply for changing student home page layout
	app.post("/home/changeLayout",function(req,res){
		var layout = {
			chosenBackground:req.body.chosenBGPic,
			chosenPicture:req.body.chosenPic
		};
		console.log(layout);
		//update in database, the layout of student's profile
		students.update(layout,{where:{email:req.user.email}}).then(function(userData){
			res.end();
		});

	});
}