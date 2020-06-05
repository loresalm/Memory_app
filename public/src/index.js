


function goodBye(){
    if(SAVED){
        return 
    }
    
    return "sure to leave without save?"
    
}

window.onbeforeunload = goodBye;



var BackgroundDiv= document.createElement("Div")
BackgroundDiv.setAttribute("id", "background-div");
document.body.appendChild(BackgroundDiv)

//save e login
var addFileAndUser= document.createElement("Div")
addFileAndUser.setAttribute("id", "add-file-and-user-div");
document.body.appendChild(addFileAndUser)

/// btn sign in
var btnSignin = inpt("btnSigninImp", "", addFileAndUser, "button")
btnSignin.setAttribute("value", "Register")
btnSignin.setAttribute("onclick", "displayDiv("+0+")")

var signinDiv= document.createElement("Div")
signinDiv.setAttribute("id", "sign-in-div");
BackgroundDiv.appendChild(signinDiv)
signinDiv.innerText = "Register: "

var btnCloseSign = inpt("btnClose", "", signinDiv, "button")
btnCloseSign.setAttribute("value", "x")
btnCloseSign.setAttribute("onclick", "closeDiv("+0+")")

var nameU= inpt("nameUImp", "Name", signinDiv, "text")
var mail= inpt("mailImp", "Mail", signinDiv, "text")
mail.setAttribute("maxlength", "40");
var passwordU= inpt("passwordUImp", "Password", signinDiv, "password")
var confirmPasswordU= inpt("confirmPasswordU", "Confirm Password", signinDiv, "password")

var btnsign = inpt("btnSaveSignImp", "", signinDiv, "button")
btnsign.setAttribute("value", "OK")
btnsign.setAttribute("onclick", "saveUnser()")







var iframe = document.createElement('iframe');
iframe.style.position = "fixed";
iframe.style.display = "none "
iframe.style.left = iframe.style.right = iframe.style.top = iframe.style.bottom = "0";
iframe.style.width= "100%"
iframe.style.height= "100%"
iframe.style.zIndex = 2;
iframe.style.border= "0px"
BackgroundDiv.appendChild(iframe);


///

///btn login
var btnLogin= inpt("btnloginImp", "", addFileAndUser, "button")
btnLogin.setAttribute("value", "Login")
btnLogin.setAttribute("onclick", "displayDiv("+ 1 +")")

var loginDiv= document.createElement("Div")
loginDiv.setAttribute("id", "login-div");
BackgroundDiv.appendChild(loginDiv)
loginDiv.innerText = "Login:"

var btnCloseLogin = inpt("btnClose", "", loginDiv, "button")
btnCloseLogin.setAttribute("value", "x")
btnCloseLogin.setAttribute("onclick", "closeDiv("+1+")")

var nameLogin= inpt("nameLoginImp", "Name", loginDiv, "text")
var passwordLogin= inpt("passwordLogin", "Password", loginDiv, "password")

var btnlog = inpt("btnSaveSignImp", "", loginDiv, "button")
btnlog.setAttribute("value", "OK")
btnlog.setAttribute("onclick", "loginUser()")



//btn logout
var btnLogout= inpt("btnLogoutImp", "", addFileAndUser, "button")
btnLogout.setAttribute("value", "Logout")
btnLogout.setAttribute("onclick", "logout()")



//btn save
var SAVED= false
var btnSave= inpt("btnSaveImp", "", addFileAndUser, "button")
btnSave.setAttribute("value", "Save")
btnSave.setAttribute("onclick", "save()")
btnSave.style.backgroundColor= "rgba(255, 255, 255, 0.5)"



var addUserSpan= document.createElement("span");
addUserSpan.textContent = "Register to save your notes";
addFileAndUser.appendChild(addUserSpan);




function displayDiv(n){
    iframe.style.display = "block"
    
    if( n == 1 ){
        loginDiv.style.display = "block"
        
    } else{
        signinDiv.style.display = "block"
       
    }
    
}


async function saveUnser(){


    if(confirmPasswordU.value!= passwordU.value){
        alert("put right password...")
        return
    }
    USER.mail= mail.value
    USER.name= nameU.value
    USER.password= confirmPasswordU.value

    if(USER.mail == ""){
        alert("empty mail")
        return
    }
    if(USER.password == ""){
        alert("empty password")
        return
    }
    if(USER.name == ""){
        alert("name password")
        return
    }

    /*
    var mailadvise = document.createElement('h3');
    signinDiv.appendChild(mailadvise)
    mailadvise.innerText= "Check your mail:"
    var mailadvise1 = document.createElement('h4');
    signinDiv.appendChild(mailadvise1)
    mailadvise1.innerText= "If there isn't a mail,"
    var mailadvise2 = document.createElement('h4');
    mailadvise2.innerText= "check your junk email folder"
    signinDiv.appendChild(mailadvise2)
    */

   
    USER.addE()
    const ursS = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(USER) 
    }
    // post data function 
    var f = await fetch('/postsS', ursS).then((res) => {
        return res.json()}).then((data) => {
            return data
        })
    console.log("f : sign in ", f)
    if (f.res == "nameError"){
        alert("user name already exist... ")
        closeDiv(0)
        return
    } else {
        alert("Confirm your mail, if there isn't any mail check yunk folder")
        closeDiv(0)
    }

    
    
    

}
console.log(EXAM)
async function loginUser(){
    console.log(EXAM)

    
    var nmlg = nameLogin.value
    var pswdlg = passwordLogin.value
    
    const ursL = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nmlg, pswdlg}) 
    }

    
    
    var f = await fetch('/postsL', ursL).then((res) => {
    return res.json()}).then((data) => {
        return data
    })
    
    console.log("f : login ", f)
    console.log("f lengt ", f.length)
    if (f.res == "error"){
        alert("user name or password incorrect...")
        return
    }

    USER.name = nmlg
    USER.password= pswdlg

    addUserSpan.textContent = "Hello "+ USER.name
    
    EXAM.name = USER.name
    if (f.length == 1){
        f = f[0]
    }
    EXAM.exams = f.exams
    EXAM.blocks = f.blocks
    EXAM.exams_grades = f.exams_grades
    EXAM.blocks_grades = f.blocks_grades
    console.log("EXAM after login", EXAM)
    
    updateDisplayBlock()

    closeDiv(1)
    

}

function closeDiv(n) {
    iframe.style.display = "none"
    if( n == 1 ){
        loginDiv.style.display = "none"
    } else {
        signinDiv.style.display = "none"
    }
}


async function save(){

    if(USER.name == ""){
        displayDiv(1)
        return
    }

    const ursS = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(EXAM) 
    }
    // post data function 
    var f = await fetch('/postsSave', ursS).then((res) => {
        return res.json()}).then((data) => {
            return data
        })

    console.log("f : save", f)
    SAVED= true
    btnSave.style.backgroundColor= "rgb(0, 255, 0)" 
  
    
}

function logout(){

    if(USER.name == ""){
        displayDiv(1)
        return
    }

    if(!SAVED){
        confirm("Are you sure logout without save")
        return 
    }
  
    
    EXAM.name= ""
    EXAM.exams= []
    EXAM.blocks= []
    EXAM.exams_grades= []
    EXAM.blocks_grades= []
    addUserSpan.textContent = "Register to save your note";
    console.log("LOOOOGOUT")
    updateDisplayBlock()

}

//grade gestion
var PutDataDiv= document.createElement("Div")
PutDataDiv.setAttribute("id", "put-data-div");
BackgroundDiv.appendChild(PutDataDiv)

var putPtl= document.createElement("H3")
putPtl.textContent = "Create subject:"
PutDataDiv.appendChild(putPtl)


function inpt(name, pholder, parent, type){
    var inptT = document.createElement("INPUT");
    inptT.setAttribute("name",name);
    inptT.setAttribute("type", type);
    inptT.setAttribute("placeholder", pholder);
    inptT.setAttribute("maxlength", "11"); //max lenght of all imput!
    parent.appendChild(inptT)
    return inptT
}

var ExamNameImp= inpt("examNameImp", "Exam Name", PutDataDiv, "text")
ExamNameImp.setAttribute("maxlength", "10");
var BlockImp= inpt("blockImp", "Block", PutDataDiv, "text")
var CoefImp= inpt("coefImp", "Coeff", PutDataDiv, "number")
CoefImp.min = 0
CoefImp.max = 999
CoefImp.step = 0.25
CoefImp.onkeydown= false

//max number coeff

var NbMidImp= inpt("nbMidImp", "Nb Midterm", PutDataDiv, "number")
NbMidImp.setAttribute("onclick", "createMidChoose()")
NbMidImp.min = 1
NbMidImp.max = 7
NbMidImp.step = 1
NbMidImp.onkeydown= false
var addS= inpt("addSImp", "", PutDataDiv, "button")
addS.setAttribute("onclick", "addSubject()")
addS.setAttribute("value", "ADD")


var ChooseMidDiv= document.createElement("Div")
PutDataDiv.appendChild(ChooseMidDiv)

var checkPerc = 0
function createMidChoose() {
    if(ChooseMidDiv != null){
        ChooseMidDiv.remove()
        EXAM_DATA.midterm = []
        checkPerc = 0
    }

    if((NbMidImp.value > 6)){
        alert("to many midterm ...")
        return
    }
    ChooseMidDiv = document.createElement("Div")


    for(var i = 0; i <NbMidImp.value; i++){
        var midDiv = document.createElement("Div")
        midDiv.setAttribute("id", "middiv-div");

        var nameMid= inpt("nameMid"+ i, "NameMid",  midDiv,"text")
        nameMid.setAttribute("maxlength", "7");
        var percMid= inpt("midPer"+ i, "%", midDiv,"number")
        percMid.style.width= "50px";  
        percMid.min = 0
        percMid.max = 100
        percMid.step = 1
        percMid.onkeydown= false
        ChooseMidDiv.appendChild(midDiv)
    }
    PutDataDiv.appendChild(ChooseMidDiv)

}
var AddButtonDiv = document.createElement("Div")
AddButtonDiv.setAttribute("id", "add-button-div");
var btnAddSubj = inpt("btnAddSubjImp", "", AddButtonDiv, "button")
btnAddSubj.setAttribute("value", "ADD SUBJECT")
btnAddSubj.setAttribute("onclick", "generateSubject()")

function generateSubject(){
    PutDataDiv.style.display = "block"
    iframe.style.display = "block"
}

var btnCloseGenerateS = inpt("btnClose", "", PutDataDiv, "button")
btnCloseGenerateS.setAttribute("value", "x")
btnCloseGenerateS.setAttribute("onclick", "closeDivGenerateS()")

function closeDivGenerateS(){
    PutDataDiv.style.display = "none"
    iframe.style.display = "none"
}


var checkNbblock= 0
function addSubject(){

    
    if(!(isNaN(BlockImp.value))){
        alert("put block name...")
        return
    }
 
    if(!(CoefImp.value > 0)){
        alert("put positive coeff...")
        return
    }
    if(!(NbMidImp.value > 0)){
        alert("put positive number mid...")
        return
    }

    //min number imput value!! 
   
    

    for(var i = 0; i <NbMidImp.value; i++){
        if(document.querySelector('input[name=nameMid'+i+']') == null){
            alert("click number midterm input...")
            checkPerc = 0
            return
        }
        console.log(Number(document.querySelector('input[name=midPer'+i+']').value))
        EXAM_DATA.addMd(document.querySelector('input[name=nameMid'+i+']').value, Number(document.querySelector('input[name=midPer'+i+']').value))
        checkPerc+= EXAM_DATA.midterm[i][1]

    }
    if(!(checkPerc == 100)){
        console.log(checkPerc)
        alert("put right %...")

        checkPerc = 0
        EXAM_DATA.midterm = []
        return
    }

    EXAM_DATA.name = ExamNameImp.value
    EXAM_DATA.block = BlockImp.value
    EXAM_DATA.coeff = CoefImp.value

    EXAM.addExam(EXAM_DATA)

    
    updateDisplayBlock()


    checkPerc = 0
    EXAM_DATA.midterm = []
    EXAM_DATA.name = ''
    EXAM_DATA.block = ''
    EXAM_DATA.coeff = ''

    closeDivGenerateS()


}

BackgroundDiv.appendChild(document.createElement("P"))
var DisplayBlockDiv= document.createElement("Div")
DisplayBlockDiv.setAttribute("id", "display-block-div");
BackgroundDiv.appendChild(DisplayBlockDiv)
DisplayBlockDiv.appendChild(AddButtonDiv)

var DisplayInfoDiv= document.createElement("Div")
DisplayInfoDiv.setAttribute("id", "display-info-div");
DisplayBlockDiv.appendChild(DisplayInfoDiv)

var titleInfo= document.createElement("H2")
titleInfo.textContent = "INFO"
DisplayInfoDiv.appendChild(titleInfo)

var titleBl= document.createElement("H3")
titleBl.textContent = "Calculation grade BLOCK:"
DisplayInfoDiv.appendChild(titleBl)
var spanInfo1 = document.createElement("span")
spanInfo1.textContent= "[  ]"
spanInfo1.style.color = "rgb(255, 0, 0)"
titleBl.appendChild(spanInfo1)

var textInfoBlP = document.createElement("P")
textInfoBlP.textContent = "( (note_exam1*coef1 + ... + note_examN*coefN) / (coef1 + ... + coefN) )"
DisplayInfoDiv.appendChild(textInfoBlP)


var titleEx= document.createElement("H3")
titleEx.textContent = "Calculation grade EXAM:"
DisplayInfoDiv.appendChild(titleEx)
var spanInfo2 = document.createElement("span")
spanInfo2.textContent= "[  ]"
spanInfo2.style.color = "rgb(77, 76, 76)"
titleEx.appendChild(spanInfo2)

var textInfoExP = document.createElement("P")
textInfoExP.textContent = "( ((note_mid1/100) * perc.1 ) + ... + (note_midN/100) * perc.N) ) "
DisplayInfoDiv.appendChild(textInfoExP)

var titleRoundup= document.createElement("H4")
titleRoundup.textContent = "EXAM grade are round up at .25 (ex: 4.88 => 5)"
DisplayInfoDiv.appendChild(titleRoundup)


var iframe2 = document.createElement('iframe');
iframe2.style.position = "fixed";
iframe2.style.display = "none "
iframe2.style.left = iframe.style.right = iframe.style.top = iframe.style.bottom = "0";
iframe2.style.width= "100%"
iframe2.style.height= "100%"
iframe2.style.zIndex = 1;
iframe2.style.border= "0px"
iframe2.style.top= "0px"
BackgroundDiv.appendChild(iframe2);


var btnCloseInfo = inpt("btnCloseInfo", "", DisplayInfoDiv, "button")
btnCloseInfo.setAttribute("value", "x")
btnCloseInfo.setAttribute("onclick", "closeDivMean()")



function closeDivMean(){
    DisplayInfoDiv.style.display = "none"
    iframe2.style.display = "none"
}
function generateDivMean(){
    DisplayInfoDiv.style.display = "block"
    iframe2.style.display = "block"
    
    
}

function updateDisplayBlock(){

    SAVED= false
    btnSave.style.backgroundColor= "rgba(255, 255, 255, 0.5)"

    DisplayBlockDiv.remove()
    DisplayBlockDiv= document.createElement("Div")
    DisplayBlockDiv.setAttribute("id", "display-block-div");
    BackgroundDiv.appendChild(DisplayBlockDiv)


    DisplayBlockDiv.appendChild(AddButtonDiv)
    DisplayBlockDiv.appendChild(DisplayInfoDiv)

    //
    if( EXAM.blocks.length>0){
    var btnInfo = inpt("btnInfoBlkImp", "", DisplayBlockDiv, "button")
    btnInfo.setAttribute("value", "?")
    btnInfo.setAttribute("onclick", "generateDivMean()")
}
    

   

    
    for(var i = 0; i< EXAM.blocks.length; i++){


        var blk= document.createElement("Div")
        blk.setAttribute("class", "blk-class");
        DisplayBlockDiv.appendChild(blk)

        var btnCloseBlk = inpt("btnCloseBlkImp", "", blk, "button")
        btnCloseBlk.setAttribute("value", "x")
        btnCloseBlk.setAttribute("onclick", "closeBlock("+i+")")

        
        /*

        meanBlkP.onmouseover = function(){
            btnInfoBlk.style.display= "block"
        }
        
        meanBlkP.onmouseleave = function(){
            btnInfoBlk.style.display= "none" 
        }
        */
        
        var titleBlkP= document.createElement("H2")
        titleBlkP.innerHTML= EXAM.blocks[i]
        blk.appendChild(titleBlkP)

        var meanBlkP= document.createElement("H1")
        meanBlkP.innerHTML= EXAM.blocks_grades[i]
        blk.appendChild(meanBlkP)
        
    

        var boxIndex= EXAM.blocks.indexOf(EXAM.blocks[i])
        for(var j = 0; j< EXAM.exams[boxIndex].length; j++){
            
            var exmDiv= document.createElement("Div")
            exmDiv.setAttribute("class", "exm-class");
            blk.appendChild(exmDiv)

            var btnCloseExm = inpt("btnCloseExm", "", exmDiv, "button")
            btnCloseExm.setAttribute("value", "x")
            btnCloseExm.setAttribute("onclick", "closeExam("+i+","+j+")")

            /*
            var btnInfoExm = inpt("btnInfoExmImp", "", exmDiv, "button")
            btnInfoExm.setAttribute("value", "?")
            btnInfoExm.setAttribute("onclick", "infoMeanExm()")
            */




            var titleExmP= document.createElement("H2")
            titleExmP.innerHTML= EXAM.exams[boxIndex][j].name
            titleExmP.style.fontWeight= "300"
            exmDiv.appendChild(titleExmP)

            var noteExmP= document.createElement("H1")
            noteExmP.setAttribute("name", "noteEx");
            noteExmP.innerHTML= EXAM.exams_grades[boxIndex][j][0]
            noteExmP.style.fontWeight= "300"
            exmDiv.appendChild(noteExmP)

            var noteExmP= document.createElement("H1")
            noteExmP.setAttribute("name", "noteWithOutmean");
            console.log("EXAM.exams_grades[boxIndex][j]"+ EXAM.exams_grades[boxIndex][j])
            noteExmP.innerHTML= EXAM.exams_grades[boxIndex][j][2]
            noteExmP.style.fontWeight= "100"
            exmDiv.appendChild(noteExmP)

            var ceofExmP= document.createElement("H1")
            ceofExmP.setAttribute("name", "coefEx");
            ceofExmP.innerHTML= "coeff: "+EXAM.exams_grades[boxIndex][j][1]
            exmDiv.appendChild(ceofExmP)

            for(var x = 0; x < EXAM.exams[boxIndex][j].midterm.length; x++){
                createChangeGrade(exmDiv, EXAM.exams[boxIndex][j].midterm[x], i, j, x)
            }
            EXAM.updateGrade(i, j)
        } 
    }
}

function closeBlock(idx){
    
    EXAM.exams.splice(idx, 1);
    EXAM.blocks.splice(idx, 1);
    EXAM.exams_grades.splice(idx, 1);
    EXAM.blocks_grades.splice(idx, 1)
    updateDisplayBlock()
    return
    
}
function closeExam(idxB, indxE){

    EXAM.exams[idxB].splice(indxE, 1);
    EXAM.exams_grades[idxB].splice(indxE, 1);
    EXAM.updateGrade(idxB, 0)
    updateDisplayBlock()
    return
    
}





function createChangeGrade(exmDiv, nameMidPerNt, pos1, pos2, pos3){
    var titleMidP = document.createElement("H4")
    titleMidP.innerHTML= nameMidPerNt[0] + ": " +  nameMidPerNt[1] +"%"
    exmDiv.appendChild(titleMidP)
    
    var noteMidS = document.createElement("span")
    var btnMNote = inpt("btnNote", "", exmDiv, "button")
    btnMNote.setAttribute("value", "-")
    btnMNote.setAttribute("onclick", "onClick("+ (-0.25) + "," + pos1+ "," + pos2+ "," +pos3+ ")")

    noteMidS.innerHTML= nameMidPerNt[2]
    exmDiv.appendChild(noteMidS)

    var btnPNote = inpt("btnNote", "", exmDiv, "button")
    btnPNote.setAttribute("value", "+")
    btnPNote.setAttribute("onclick", "onClick("+ 0.25 + "," + pos1+ "," + pos2+ "," +pos3+ ")")
   
}


function onClick(dir, pos1, pos2, pos3){
    if(dir>0 && EXAM.exams[pos1][pos2].midterm[pos3][2] < 6){
        EXAM.exams[pos1][pos2].midterm[pos3][2]+= dir 
        EXAM.updateGrade(pos1, pos2)
        
        updateDisplayBlock()
        console.log("Exam after update"+EXAM)
        return
    }
    if(dir<0 && EXAM.exams[pos1][pos2].midterm[pos3][2] > 1){
        EXAM.exams[pos1][pos2].midterm[pos3][2]+= dir 
        EXAM.updateGrade(pos1, pos2)
        updateDisplayBlock()
        return
    }
    
    
}