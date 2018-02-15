module.exports = function(sequelize, Sequelize) {
	var emotPrompts = sequelize.define("emotPrompts", {			
		question:{
			type:Sequelize.STRING,
			allowNull:false
		},
		topic: {
			type: Sequelize.STRING,
			allowNull:false
		},
		from:{
			type:Sequelize.STRING,
			defaultValue:"standard"
		}
	});

/*	emotPrompts.bulkCreate([
		{
			question: "When I go to school I feel…",
			topic: "school"
		}, {
			question: "When my classmate cries I feel…",
			topic: "relationships, expression"
		}, {
			question: "When I cry I feel...",
			topic: "expression, self"
		}, {
			question: "When my friend tells a joke I feel...",
			topic: "relationships"
		}, {
			question: "When I watch my favorite movie I feel...",
			topic: "self, gain"
		}, {
			question: "When I eat my favorite food I feel…",
			topic: "self, gain"
		}, {
			question: "When it's my birthday I feel…",
			topic: "self, change"
		}, {
			question: "When I am in my least favorite class I feel…",
			topic: "school"
		}, {
			question: "When I lose a game I feel…",
			topic: "self, loss"
		}, {
			question: "When I am invited to a party I feel…",
			topic: "self, change"
		}, {
			question: "When my parent tells me no I feel…",
			topic: "family, loss"
		}, {
			question: "When my teacher tells me no I feel…",
			topic: "school, loss"
		}, {
			question: "When my classmate borrows something without asking I feel…",
			topic: "school, relationships, loss"
		}, {
			question: "When it is loud I feel…",
			topic: "sensory"
		}, {
			question: "When I don't get to do what I want to do I feel…",
			topic: "loss"
		}, {
			question: "When I don't get to do what I usually do I feel…",
			topic: "change"
		}, {
			question: "When my desk is really messy I feel...",
			topic: "school, sensory"
		}, {
			question: "When I have to give someone a hug and I don't want to I feel...",
			topic: "relationships, sensory"
		}
	]).then(function(data){});*/
	

return emotPrompts;
}