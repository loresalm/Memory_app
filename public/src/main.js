
function inpt(name, parent, type){
    var inptT = document.createElement("INPUT");
    inptT.setAttribute("name",name);
    inptT.setAttribute("type", type);
    parent.appendChild(inptT)
    return inptT
}


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


