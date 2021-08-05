const express = require('express');

const app = express();

app.get('/', function(req,res){
	res.send("Welcome!");
});

app.get('/check', function(req,res){
	res.send("Check succesfull");
});

app.get('/check/:id', function(req,res){
	const id = req.params.id;
	res.send("Succesfully checked id : "+ id);
});

app.listen(8080, function(req,res){
	console.log("Welcome");
})
