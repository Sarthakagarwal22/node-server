const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
const port = process.env.Port || 3000;
var app = express();
var currentYear = new Date().getFullYear();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine' , 'hbs');

app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now} : ${req.method} ${req.url} \n`;

fs.appendFile('server.log',log,(err)=>{
	if(err){
		console.log("Unable to access server.log file")
	}
next();
});

});


app.use((req,res,next)=>{
	res.render('maintain.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.render("home.hbs",{
		pageTitle : "Home Page",
		welcomeMessage : "welcome to the Home page of my website",
		currentYear 
	});
}); 

app.get('/about',(req,res)=>{
	res.render("about.hbs",{
		pageTitle: "About Page",
		currentYear 
	});
});

app.get("/bad",(req,res)=>{
	res.send({
		errorMessage:"The page you are looking for doesnt exist"
	})
});

app.listen(port, ()=>{
 console.log(`Server running at port ${port}`);
});