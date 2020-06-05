

const EXAM_DATA= {
    block: '',
    coeff: '',
    name: '',
    midterm: [],

    addMd: function(md, pe){
        this.midterm.push([md, pe, 4])
    }
}
function calculateGrade(mid){
    var noteEx= 0
    for(var i= 0; i < mid.length; i++){
        noteEx+= (mid[i][1]/100)*mid[i][2]
    }
    var noteInt = Math.floor(noteEx)
    var noteDec = noteEx- Math.floor(noteEx)
    if(noteDec> 0.5){
        if(noteDec> 0.75){
            noteDec = noteDec- 0.75
            if(noteDec< 0.125){
                noteEx= noteInt+ 0.75
            }else{
                noteEx= noteInt+ 1
            }
        }else{
            noteDec = noteDec- 0.5
            if(noteDec< 0.125){
                noteEx= noteInt+ 0.5
            }else{
                noteEx= noteInt+ 0.75
            }
        }
    } else{
        if(noteDec> 0.25){
            noteDec = noteDec- 0.25
            if(noteDec< 0.125){
                noteEx= noteInt+ 0.25
            }else{
                noteEx= noteInt+ 0.5
            }
        }else{
            if(noteDec< 0.125){
                noteEx= noteInt 
            }else{
                noteEx= noteInt+ 0.25
            }
        }
    }

    return noteEx
}
function calculateGradeExact(mid){
    var noteEx= 0
    for(var i= 0; i < mid.length; i++){
        noteEx+= (mid[i][1]/100)*mid[i][2]
    }
    return noteEx
}
function calculateGradeBlock(exm){
    
    var noteBl= 0
    var sumCo = 0
    for(var i= 0; i < exm.length; i++){
        noteBl+= exm[i][0]*exm[i][1]
        sumCo += exm[i][1]
    }
    noteBl = noteBl/sumCo
    return noteBl.toFixed(3)
}


const EXAM= {
    exams: [],
    blocks: [],
    addExam: function(){ 
        if (!(this.blocks.includes(EXAM_DATA.block))){
            
            this.blocks.push(EXAM_DATA.block)
            this.blocks_grades.push(4)
            this.exams.push([])
            this.exams_grades.push([])
            
        } 
        this.exams[this.blocks.indexOf(EXAM_DATA.block)].push(Object.assign({}, EXAM_DATA))
        this.exams_grades[this.blocks.indexOf(EXAM_DATA.block)].push([calculateGrade(EXAM_DATA.midterm), Number(EXAM_DATA.coeff), calculateGradeExact(EXAM_DATA.midterm)])
        this.blocks_grades[this.blocks.indexOf(EXAM_DATA.block)] = calculateGradeBlock(this.exams_grades[this.blocks.indexOf(EXAM_DATA.block)])
    
    },
    exams_grades: [],
    updateGrade: function(pos1, pos2){
        if(this.exams[pos1].length == 0){
            this.blocks_grades[pos1] = 0
            return
        }
        this.exams_grades[pos1][pos2][0]= calculateGrade(this.exams[pos1][pos2].midterm)
        console.log("inside data this.exams_grades[pos1][pos2][2]" + calculateGradeExact(this.exams[pos1][pos2].midterm))
        this.exams_grades[pos1][pos2][2]= calculateGradeExact(this.exams[pos1][pos2].midterm)
        this.blocks_grades[pos1] = calculateGradeBlock(this.exams_grades[pos1])
    },

    blocks_grades: [],

    name: ''
}


const USER= {
    mail: '',
    name: '',
    active: false,
    password: '',
    exam: [],
    addE: function() {
        this.exam.push(Object.assign({}, EXAM))
    }
    
}




 




