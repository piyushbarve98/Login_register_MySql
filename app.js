const express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//my sql data base import and connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
//connection ended
function registerData(data){
        var sql = `INSERT INTO users (name, email, uname, password) VALUES ('${data.name}', '${data.email}', '${data.uname}', '${data.password}' )`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('user added');
    });
}

function loginData(data,req,res){
    // var sql = `INSERT INTO customers (uname, password) VALUES ('${data.uname}', '${data.password}' )`;

    var sql = `SELECT * FROM users WHERE uname ='${data.uname}' AND password = '${data.password}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;

        else if(result.length>0){
            res.send('login succesfull');
        }
        else{
            res.send('login failed');
        }
});
}


let app = express();
let urlencoded = bodyParser.urlencoded({ extended: false })
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/register.html');
});
app.post('/data',urlencoded,(req,res)=>{
    registerData(req.body);
    res.redirect('login');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
});

app.post('/login-data',urlencoded,(req,res)=>{
    loginData(req.body,req,res);

    
});
app.listen(2000,()=>{
    console.log('listening to server 2000...');
});