
function inpt(name, parent, type){
    var inptT = document.createElement("INPUT");
    inptT.setAttribute("name",name);
    inptT.setAttribute("type", type);
    parent.appendChild(inptT)
    return inptT
}


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
var r_ = DB.ref('wrong_Question/correct')
console.log(JSON.stringify(r_.child('Q3')))

var Q = {
          question: "Gli elementi, che suddividono lo scafo in senso trasversale, sono:",
          choices: ["le paratie.","gli osteriggi.","i boccaporti."],
          true: 2
        }

r_.push(Q)


var BackgroundDiv= document.createElement("Div")
BackgroundDiv.setAttribute("id", "background-div");
document.body.appendChild(BackgroundDiv)


var QuestionTextDiv= document.createElement("Div")
QuestionTextDiv.setAttribute("id", "question-text-div");
BackgroundDiv.appendChild(QuestionTextDiv)
QuestionTextDiv.innerText = "Question ?"

/// btn sign in
var R1 = inpt("btnR3", BackgroundDiv, "button")
R1.setAttribute("value", "response 1")
R1.setAttribute("onclick", "")

/// btn sign in
var R2 = inpt("btnR3", BackgroundDiv, "button")
R2.setAttribute("value", "response 2")
R2.setAttribute("onclick", "")


/// btn sign in
var R3 = inpt("btnR3", BackgroundDiv, "button")
R3.setAttribute("value", "response 3")
R3.setAttribute("onclick", "")


