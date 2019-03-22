//Stephen Green Project 1


// Global Variables
var mcForm;
var textForm;
var tfForm;
var checkForm;
var qText;
var qImage;
var qNumber = 0;

var MC1 = {
  type: "mc",
  question: "Who's that Pokemon?",
  image: "images/charizard.jpg",
  A: "Pikachu",
  B: "Charizard",
  C: "Dragonite",
  D: "Mewtwo",
  correct: "B",
};

var MC2 = {
  type: "mc",
  question: "Which pokemon is a starter option from the Johto Region",
  image: null,
  A: "Mudkip",
  B: "Bulbasaur",
  C: "Chimchar",
  D: "Totodile",
  correct: "D",
};

var TF1 = {
  type: "trueFalse",
  question: "Is Gyarados a Dragon Type?",
  image: "images/gyarados.png",
  correct: "false",
};

var Text1 = {
  type: "text",
  question: "Name Ash's iconic rival",
  image: "images/garyoak.gif",
  correct: "GARY OAK",
};

var Check1 = {
  type: "check",
  question: "What type(s) is Tyranitar?",
  image: "images/tyranitar.png",
  A: "Rock",
  B: "Dragon",
  C: "Dark",
  D: "Fighting",
  correct: "AC",
};

var QuestionContainer = [MC1, MC2, TF1, Text1, Check1];
var answerStatus = [false,false,false,false,false];

//End Global Variables


//On Load Hide the Test
window.onload = function(){
    document.getElementById("testContainer").style.display = "none";
}

//***************************************************************************
//Quiz Section

//Go back to home page
function GoHome(){
  document.getElementById("testContainer").style.display = "none";
  document.getElementById("homeContainer").style.display = "block";
}

//Load Quiz Page and start test
function BuildQuiz(){
  document.getElementById("testContainer").style.display = "block";
  document.getElementById("homeContainer").style.display = "none";
  document.getElementById("adminContainer").style.display = "none";

  //Hide all forms on page
  HideForms();
  qText = document.getElementById("qText");
  qImage = document.getElementById("qImage");
  LoadQuestion();
}


//Loads current question based of question Number
function LoadQuestion(){
  //Showing Which Question Number They are on
  document.getElementById("qNum").innerHTML = qNumber + 1;
  document.getElementById("qHeader").innerHTML = qNumber + 1 + "/" + QuestionContainer.length;

  //Updating how much of progressBar should be filled
  var progressPercentage = ((qNumber + 1) / QuestionContainer.length) * 100;
  var progressBar = document.getElementById("progressBar");
  progressBar.style.width = progressPercentage + "%";

  //Hide previous forms to make room for the incoming one
  HideForms();

  //Determine which type of form to load
  var currentQ = QuestionContainer[qNumber];
  var submitButton = document.getElementById("Submit")
  switch(currentQ.type){
    case "mc":          LoadMultipleChoice(currentQ);
                        submitButton.onclick = function(){
                          CheckAnswer(mcForm,"optionMC", currentQ);
                        }
                        break;

    case "trueFalse":   tfForm.style.display = "block";
                        LoadText(currentQ);
                        submitButton.onclick = function(){
                          CheckAnswer(tfForm,"optionTF", currentQ);
                        }
                        break;

    case "text":        textForm.style.display = "block";
                        LoadText(currentQ);
                        submitButton.onclick = function(){
                          CheckAnswer(textForm,"textOption", currentQ);
                        }
                        break;

    case "check":       LoadCheckBoxes(currentQ);
                        submitButton.onclick = function(){
                          CheckAnswer(checkForm,"checkOption", currentQ);
                        }
                        break;
  }
}


//Goes to next Question
function NextQuestion(){
  if (qNumber < QuestionContainer.length-1){
    qNumber ++;
    LoadQuestion();
  }
  //If at the end will take you to results screen after asking for confirmation
  else if (qNumber = QuestionContainer.length -1){
    if(confirm("You are about to finish the test"))
    Feedback();
  }
}

//Go back one question
function PrevQuestion(){
  if (qNumber > 0){
    qNumber --;
    LoadQuestion();
  }
}

//Jump to first question
function FirstQuestion(){
  qNumber = 0;
  LoadQuestion();
}

//Jump to LastQuestion
function LastQuestion(){
  qNumber = QuestionContainer.length -1;
  LoadQuestion();
}


//Used for all types of Questions
//Passes in which form
//Name of buttons
//and the current question
function CheckAnswer(form,name,question){
  var val = "";
  var radios = form.elements[name];
  //Special case for fill in the blank questions that cannot be scored the same way
  if (name == "textOption"){
    val = document.getElementById("userInput").value;
    val = val.toUpperCase();
  }
  else{
    for (var i=0, len=radios.length; i<len; i++) {
          if ( radios[i].checked ) { // radio checked?
            //Builds on to val string to work with check box form
              val += radios[i].value; // if so, hold its value in val
          }
      }
  }

  //If user gets it right
  if (val == question.correct){
    form.style.backgroundColor = "#b4ff8e";
    //Update answer status and change color to let user know
    answerStatus[qNumber] = true;
  }

  else{
    //If its wrong make it red and re-update answer status
    form.style.backgroundColor = "#fc5050";
    answerStatus[qNumber] = false;

    //Potential to add div to show correct answer but was still glitchy
    var right = document.createElement("p");
    var text = document.createTextNode(question.correct);
    right.appendChild(text);
    right.style.color = "b4ff8e";
    right.setAttribute("id", "rightP");
    //form.appendChild(right);
  }
}

//Function to Load and Handle Multiple Choice Question
function LoadMultipleChoice(mcq){
  //Unhides Multiple Choice Form
  mcForm.style.display = "block";

  //Display Question and Picture if available
  qText.innerHTML = mcq.question;
  if (mcq.image != null){
    document.getElementById("pictureContainer").style.display = "block";
    qImage.src = mcq.image;
  }

  //Display Options
  document.getElementById("mcA").innerHTML = mcq.A;
  document.getElementById("mcB").innerHTML = mcq.B;
  document.getElementById("mcC").innerHTML = mcq.C;
  document.getElementById("mcD").innerHTML = mcq.D;

}

//Same as Load Multiple Choice
function LoadCheckBoxes(checkQ){
  checkForm.style.display = "block";

  qText.innerHTML = checkQ.question;
  if (checkQ.image != null){
    document.getElementById("pictureContainer").style.display = "block";
    qImage.src = checkQ.image;
  }
  document.getElementById("checkA").innerHTML = checkQ.A;
  document.getElementById("checkB").innerHTML = checkQ.B;
  document.getElementById("checkC").innerHTML = checkQ.C;
  document.getElementById("checkD").innerHTML = checkQ.D;
}

//Loads the question for other types of questions that dont have options to load
function LoadText(textQ){
  qText.innerHTML = textQ.question;
  if (textQ.image != null){
    document.getElementById("pictureContainer").style.display = "block";
    qImage.src = textQ.image;
  }
}

//Hide all forms and resets page
function HideForms(){
  mcForm = document.getElementById("mcForm");
  mcForm.style.backgroundColor = "#f2eded";
  mcForm.style.display = "none";

  textForm = document.getElementById("textForm");
  textForm.style.backgroundColor = "#f2eded";
  textForm.style.display = "none";

  tfForm = document.getElementById("tfForm");
  tfForm.style.backgroundColor = "#f2eded";
  tfForm.style.display = "none";

  checkForm = document.getElementById("checkForm");
  checkForm.style.backgroundColor = "#f2eded";
  checkForm.style.display = "none";

  document.getElementById("pictureContainer").style.display = "none";

}

//*****************************************************************************
//Results Screen

function Feedback(){
  document.getElementById("testContainer").style.display = "none";
  document.getElementById("resultContainer").style.display = "block";

  var list = document.getElementById("qResult");
  var status;
  var correctCount = 0;
  for (var i = 0; i < QuestionContainer.length; i ++){
    status = "Wrong";
    console.log(answerStatus);
    if (answerStatus[i] == true){
      status = "Right"
      correctCount++;
    }
    //Adds to list for each question and displays Question Name and if it was Right or Wrong
    var node = document.createElement("li");
    var text = document.createTextNode(QuestionContainer[i].question + " \t-\t\t\t " + status);
    node.appendChild(text);
    list.appendChild(node);
  }

  //Shows Test Score at the bottom
  var finalResult = document.getElementById("finalScore");
  finalResult.innerHTML = correctCount + " / " + (QuestionContainer.length);

}

//*************************************************************
//Admin Section

//Load Admin Page from Edit Quiz button
function AdminPage(){
  document.getElementById("testContainer").style.display = "none";
  document.getElementById("resultContainer").style.display = "none";
  document.getElementById("adminContainer").style.display = "block";


}

//Display form to build new question
function addQuestion (){
  var addForm = document.getElementById("addQ");
  addForm.style.display = "block";
}

//Creates new Question based on inputted values
function newQuestion(){
  var name = document.getElementById("nameInput").value;
  var val;
  var radios = document.getElementById("addQ").elements["typeInput"];
  //Check which Type was checked for the radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value;
            //console.log(val); // if so, hold its value in val
        }
    }

var type = val;
var option1 = document.getElementById("option1").value;
var option2 = document.getElementById("option2").value;
var option3 = document.getElementById("option3").value;
var option4 = document.getElementById("option4").value;
//For multiple choice and answer the correct must be inputted in terms of A,B,C, or D
  //Example MC Correct = C
  //Example CheckBox correct = ABC or CB (must be in alphabetical order)
var correct = document.getElementById("correct").value.toUpperCase();

  //Correct must equal true or false but can have any capitalization
if (type == "trueFalse"){
  correct = correct.toLowerCase();
}

var NewQuestion = {
  question: name,
  type: type,
  image: null,
  A: option1,
  B: option2,
  C: option3,
  D: option4,
  correct: correct,
}

QuestionContainer.push(NewQuestion);
answerStatus.push(false);
alert("Question Has Been Added");
}

function PickQuestionToRemove(){
  document.getElementById("addQ").style.display = "none";
  document.getElementById("removeQ").style.display = "block";
}

//Simply Splice array at the index that was typed in
//Easiest way to let user pick question
//Will do nothing if number is not in range
function RemoveQuestion(){
    var index = document.getElementById("numInput").value - 1;
    if ((index >= 0) && (index < QuestionContainer.length)){
      QuestionContainer.splice(index,1);
    }
    alert("You have removed Question#" + (index -1));
}

function RandomizeQuestions(){
  //Uses random and temp variables to swap items randomly 1 time for each item in array
  for (var i = QuestionContainer.length - 1; i > 0; i--) {
          var random = Math.floor(Math.random() * (i + 1));
          var temp = QuestionContainer[i];
          QuestionContainer[i] = QuestionContainer[random];
          QuestionContainer[random] = temp;
      }

    alert("You have randomized the Questions");
}
