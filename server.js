var express = require('express');
var app = express();

var bpars = require('body-parser')
var nodemailer = require('nodemailer')

app.use(express.static('public'))
app.use(express.json({limit: '2mb'}))
app.use(bpars.json());


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth:{
    user: "calculator.grade.exam@gmail.com",
    pass: "6627Lore"
  }
})

var rand, mailOptions, host, link, name


app.post('/postsL', function(req, res) {   
  var fs = require('fs');
  fs.readFile('users.json',function(err, content){
    if(err) throw err;
    var parseJson = JSON.parse(content);
    var searchFieldN = "name"
    var searchVal = req.body.nmlg
    console.log("all json",parseJson.users)
    console.log("shearch ",req.body.nmlg)
    console.log("shearch ",req.body.nmlg)
    for (var i=0 ; i < parseJson.users.length ; i++){
      console.log(i + parseJson.users[i][searchFieldN])
      if (parseJson.users[i][searchFieldN] == searchVal && parseJson.users[i].password == req.body.pswdlg && parseJson.users[i].active == true ){
        console.log("res login ", parseJson.users[i].exam) 
        return res.json(parseJson.users[i].exam)
      } 
    }
    return res.json({res: "error"})
  })

})


app.post('/postsS', function(req, res){   
  var fs = require('fs');
  fs.readFile('users.json',function(err,content){
    if(err) throw err;
    var parseJson = JSON.parse(content);
    
    var searchFieldN = "name"
    var searchVal = req.body.name

    for (var i=0 ; i < parseJson.users.length ; i++){

      if (parseJson.users[i][searchFieldN] == searchVal){

        return res.json({res: "nameError"})
      }
    }

    //put rand in json users
    name = req.body.name
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host')
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
      to : req.body.mail,
      subject : "Please confirm your Email account",
      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log("MAILOPTIONS:",mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log("error send mail ",error);
        return res.end("mailError");
     }else{
        console.log("Message sent: " + response.message);
        
      }
    });
    //console.log(parseJson)
    parseJson.users.push(req.body)
    fs.writeFile('users.json',JSON.stringify(parseJson),function(err){
      if(err) throw err;
    })
    return res.json({res:"ok"})
  })
  
})


app.get('/verify',function(req,res){
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
        console.log("email is verified");

        var fs = require('fs');
        fs.readFile('users.json',function(err, content){
          if(err) throw err;
          var parseJson = JSON.parse(content);
          console.log("confirm mail JSon:" , parseJson)
          for (var i=0 ; i < parseJson.users.length ; i++){
            console.log(parseJson.users[i]["name"]+ "VS"+ name)
            if (parseJson.users[i]["name"] == name){
              parseJson.users[i]["active"] = true
              
            }   
          }
          fs.writeFile('users.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
          })
        })
        
      res.sendfile('confirmMail.html');
      }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
  });

app.post('/postsSave', function(req, res){   
  var fs = require('fs');
  fs.readFile('users.json',function(err,content){
    if(err) throw err;
    var parseJson = JSON.parse(content);
    console.log("REQ BODY", req.body)

    var searchFieldN = "name"
    var searchVal = req.body.name

    for (var i=0 ; i < parseJson.users.length ; i++){

      if (parseJson.users[i][searchFieldN] == searchVal){
        parseJson.users[i].exam = req.body
        console.log("parseJson", parseJson)
      }
    }

    //console.log(parseJson)
    fs.writeFile('users.json',JSON.stringify(parseJson),function(err){
      if(err) throw err;
    })
    return res.json({res:"ok"})
  })
  
})
   

