////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--VARIABLE--//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//main
var COUNT_Q_EXAM = 0
var Q_EXAM_MAX = 20 //CHANGE HERE
var COUNT_Q_ALL = 0
var COUNT_Q_WRONG = 0
var DISPLAY_Q_WRONG = 0 
var COUNT_Q_WRONG_DEL = 0
var TRY_MAX = 3 //CHANGE HERE
var SCORE = 0
var STATE = "END"

//firebase
var DB 
var all_Q
var all_questions
var keys_all
var keys_exam
var wrong_questions
var keys_wrong
var GOT_DATA = false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--INIT--//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Init firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTerBeBCFv_1C6i23itfCLLTKyPqFsoQs",
  authDomain: "memoryapp-e81d6.firebaseapp.com",
  databaseURL: "https://memoryapp-e81d6.firebaseio.com",
  projectId: "memoryapp-e81d6",
  storageBucket: "memoryapp-e81d6.appspot.com",
  messagingSenderId: "374050693737",
  appId: "1:374050693737:web:d2b02d3be9471e829af8f8",
  measurementId: "G-GKN4N5QSD3"
  };

firebase.initializeApp(firebaseConfig)
DB = firebase.database();

var ref_Data = DB.ref('Data') 
ref_Data.on('value', gotData, errData)

//Init scene
var BackgroundDiv= document.createElement("Div")
BackgroundDiv.setAttribute("id", "background-div");
document.body.appendChild(BackgroundDiv)

var NBQDiv= document.createElement("Div")
NBQDiv.setAttribute("id", "nbq-div");
BackgroundDiv.appendChild(NBQDiv)

var QuestionTextDiv= document.createElement("Div")
QuestionTextDiv.setAttribute("id", "question-text-div");
BackgroundDiv.appendChild(QuestionTextDiv)


var R1 = inpt("btnR", BackgroundDiv, "button")
R1.setAttribute("onclick", "nextQuestion("+1+")")

var R1DIV= document.createElement("Div")
R1DIV.setAttribute("id", "response-text-div");
BackgroundDiv.appendChild(R1DIV)

var R2 = inpt("btnR", BackgroundDiv, "button")
R2.setAttribute("onclick", "nextQuestion("+2+")")

var R2DIV= document.createElement("Div")
R2DIV.setAttribute("id", "response-text-div");
BackgroundDiv.appendChild(R2DIV)

var R3 = inpt("btnR", BackgroundDiv, "button")
R3.setAttribute("onclick", "nextQuestion("+3+")")

var R3DIV= document.createElement("Div")
R3DIV.setAttribute("id", "response-text-div");
BackgroundDiv.appendChild(R3DIV)

var ScoreDiv= document.createElement("Div")
ScoreDiv.setAttribute("id", "score-div");
BackgroundDiv.appendChild(ScoreDiv)

var All = inpt("btnBottom",BackgroundDiv, "button")
All.setAttribute("value", "All")
All.setAttribute("onclick", "allQuestion()")
var Exam = inpt("btnBottom", BackgroundDiv, "button")
Exam.setAttribute("value", "Exam")
Exam.setAttribute("onclick", "examQuestion()")
var Wrong = inpt("btnBottom", BackgroundDiv, "button")
Wrong.setAttribute("value", "Wrongs")
Wrong.setAttribute("onclick", "wrongQuestion()")
var ResetWrong = inpt("btnBottom", BackgroundDiv, "button")
ResetWrong.setAttribute("value", "Reset W")
ResetWrong.setAttribute("onclick", "resetWrong()")

R1.setAttribute("value", "A")
R2.setAttribute("value", "B")
R3.setAttribute("value", "C")



displayQuestion()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--FUNCTION--//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function gotData(data){

	all_Q = data.val()

	all_questions = all_Q[Object.keys(all_Q)[0]]
	keys_all = Object.keys(all_questions)

	wrong_questions = all_Q[Object.keys(all_Q)[1]]
	keys_wrong = Object.keys(wrong_questions)

}

function errData(err){
	console.log("ERROR!")
	console.log(err)
}

function initWD(){

	for(var i = 0; i< keys_wrong.length; i++){
		var t = wrong_questions[keys_wrong[i]].try 
		if(t == TRY_MAX){
			COUNT_Q_WRONG_DEL++
		}
	}

}

function displayQuestion(){ 

	switch(STATE){

		case "EXAM":
			QuestionTextDiv.innerText = all_questions[keys_exam[COUNT_Q_EXAM]].question
			R1DIV.innerText = all_questions[keys_exam[COUNT_Q_EXAM]].choices[0]
			R2DIV.innerText = all_questions[keys_exam[COUNT_Q_EXAM]].choices[1]
			R3DIV.innerText = all_questions[keys_exam[COUNT_Q_EXAM]].choices[2]
			break;

		case "ALL":
			QuestionTextDiv.innerText = all_questions[keys_all[COUNT_Q_ALL]].question
			R1DIV.innerText = all_questions[keys_all[COUNT_Q_ALL]].choices[0]
			R2DIV.innerText = all_questions[keys_all[COUNT_Q_ALL]].choices[1]
			R3DIV.innerText = all_questions[keys_all[COUNT_Q_ALL]].choices[2]
			break;

		case "WRONG":
			QuestionTextDiv.innerText = wrong_questions[keys_wrong[COUNT_Q_WRONG]].question
			R1DIV.innerText = wrong_questions[keys_wrong[COUNT_Q_WRONG]].choices[0]
			R2DIV.innerText = wrong_questions[keys_wrong[COUNT_Q_WRONG]].choices[1]
			R3DIV.innerText = wrong_questions[keys_wrong[COUNT_Q_WRONG]].choices[2]
			break;

		case "END":
			QuestionTextDiv.innerText = "PRESS ALL,  EXAM OR WRONGS"
			R1DIV.innerText = "END"
			R2DIV.innerText = "END"
			R3DIV.innerText = "END"
			break;
	} 
}

function displayScore(i, par, NB_Q){
	NBQDiv.innerText = "QUESTION: "+ (NB_Q + 1) +"  of  "+ par
	switch(i){
		case -1: 
			ScoreDiv.style.background = "white";
			ScoreDiv.innerText = "SCORE=" + SCORE + " / " + par
			break;
		case 0: 
			ScoreDiv.style.background = "tomato";
			ScoreDiv.innerText = "Wrong-->SCORE:"  + SCORE + " / " + par
			break;
		case 1: 
			ScoreDiv.style.background = "lime"
			ScoreDiv.innerText = "Correct-->SCORE:"  + SCORE + " / " + par
			break;
	}

	

}

function inpt(name, parent, type){

    var inptT = document.createElement("INPUT");
    inptT.setAttribute("name",name);
    inptT.setAttribute("type", type);
    parent.appendChild(inptT)
    return inptT
}

function nextQuestion(i){

	switch(STATE){

		case "EXAM":

			var j = 0
			if(i ==  all_questions[keys_exam[COUNT_Q_EXAM]].True && COUNT_Q_EXAM <= Q_EXAM_MAX){
				SCORE++
				j= 1
			}
			
			if(COUNT_Q_EXAM < Q_EXAM_MAX){
				COUNT_Q_EXAM++
				if (COUNT_Q_EXAM== Q_EXAM_MAX){
					STATE = "END"
					displayScore(j, Q_EXAM_MAX, COUNT_Q_EXAM)
					NBQDiv.innerText = "FINISH"
					displayQuestion()
					break
				}
			}

			displayScore(j, Q_EXAM_MAX, COUNT_Q_EXAM)
			displayQuestion()

			break;

		case "ALL":

			var j = 0
			if(i ==  all_questions[keys_all[COUNT_Q_ALL]].True && COUNT_Q_ALL <= keys_all.length){
				SCORE++
				j= 1
			}
			
			if(COUNT_Q_ALL < keys_all.length){
				COUNT_Q_ALL++ 
				if(COUNT_Q_ALL == keys_all.length){
					STATE = "END"
					displayScore(j, keys_all.length, COUNT_Q_ALL)
					NBQDiv.innerText = "FINISH"
					displayQuestion()
					break;
				}
			}

			displayScore(j, keys_all.length, COUNT_Q_ALL)
			displayQuestion()

			break;

		case "WRONG":

			var j = 0
			if(i ==  wrong_questions[keys_wrong[COUNT_Q_WRONG]].True && COUNT_Q_WRONG <= keys_wrong.length){
				SCORE++
				j= 1
				var t = wrong_questions[keys_wrong[COUNT_Q_WRONG]].try + 1
				let wrongRef = DB.ref('Data/Wrong');
				wrongRef.child(keys_wrong[COUNT_Q_WRONG]).update({ try: t })
				if(t == TRY_MAX){COUNT_Q_WRONG_DEL++}
				
			}
			
			COUNT_Q_WRONG++ 
			while(wrong_questions[keys_wrong[COUNT_Q_WRONG]].try >= TRY_MAX){
					COUNT_Q_WRONG++ 
					DISPLAY_Q_WRONG++
					if(COUNT_Q_WRONG == keys_wrong.length){
						STATE = "END"
						displayScore(j, keys_wrong.length-COUNT_Q_WRONG_DEL,COUNT_Q_WRONG-DISPLAY_Q_WRONG)
						displayQuestion()
						NBQDiv.innerText = "FINISH"
						break;
					}
			} 
			displayScore(j, keys_wrong.length-COUNT_Q_WRONG_DEL,COUNT_Q_WRONG-DISPLAY_Q_WRONG)
			displayQuestion()
			break;

		case "END":

			break;
	}
}

function examQuestion(){

	SCORE = 0
	keys_exam = keys_all.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
	COUNT_Q_EXAM= 0
	displayScore(-1, Q_EXAM_MAX, COUNT_Q_EXAM)
	STATE = "EXAM"
	displayQuestion()
}

function allQuestion(){

	SCORE = 0
	COUNT_Q_ALL = 0
	STATE = "ALL"
	displayScore(-1, keys_all.length, COUNT_Q_ALL)
	displayQuestion()
}

function wrongQuestion(){
	COUNT_Q_WRONG_DEL= 0
	initWD()
	SCORE = 0
	STATE = "WRONG"
	COUNT_Q_WRONG = 0
	DISPLAY_Q_WRONG= 0
	while(wrong_questions[keys_wrong[COUNT_Q_WRONG]].try == TRY_MAX){
		COUNT_Q_WRONG++
		DISPLAY_Q_WRONG++ 
		if(COUNT_Q_WRONG == keys_wrong.length){
			STATE = "END"
		}
	}
	displayScore(-1, keys_wrong.length- COUNT_Q_WRONG_DEL,COUNT_Q_WRONG- DISPLAY_Q_WRONG)
	displayQuestion()
}

function resetWrong(){
	let wrongRef = DB.ref('Data/Wrong');
	for(var i = 0; i< keys_wrong.length; i++ ){
		wrongRef.child(keys_wrong[i]).update({ try: 0 })
	}
	COUNT_Q_WRONG_DEL = 0
	DISPLAY_Q_WRONG= 0
	STATE = "END"
	displayQuestion()
	ScoreDiv.innerText = ""
	NBQDiv.innerText = ""
	ScoreDiv.style.background = "white";		
				
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











