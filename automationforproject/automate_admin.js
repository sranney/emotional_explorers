var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });
//create user and take a quiz
nightmare
  .goto("http://emotionalexplorers.herokuapp.com/")
  .wait("form")
  .evaluate(function(){
    var event = new Event('change');
    document.querySelector("#userType").value="Student";
    document.querySelector("#userType").dispatchEvent(event);
  })
  .type("#email", "bot8@gmail.com")
  .type("#password", "bot8")
  .type("#accessKey", "bot8")
  .type("#firstName", "bot8")
  .type("#lastName", "bot8")
  .type("#age", "12")
  .type("#grade", "3")
  .evaluate(function(){
    document.querySelector("#studentInfo>select").value="Male";
  })
  .type("#about", "i'm bot8")
  .click("#sendCreds")
  .wait("#menu a:nth-child(3)")
  .click("#menu a:nth-child(3)")
  .wait(".choiceContainer:nth-child(1)")//first question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .end()
  .then(function(result) {
    console.log("complete! yay!");
  })
  .catch(function(error) {
    console.error(error);
  });

/*  .wait(".choiceContainer:nth-child(1)")//second question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//third question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//fourth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//fifth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//sixth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//seventh question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//eighth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//ninth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//tenth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//eleventh question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//twelfth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//thirteenth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//fourteenth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//fifteenth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")
  .wait(".choiceContainer:nth-child(1)")//sixteenth question
  .click(".choiceContainer:nth-child(1)")
  .click("#submit")*/
