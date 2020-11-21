const express = require('express');
const bodyParser = require('body-parser');
const secureEndpoints = require("./modules/secureEndpoints")
const db = require("./modules/datahandler");
const user = require("./modules/user");
const task = require("./modules/task");
const auth = require("./modules/auth");


const createToken = require("./modules/sbToken").create;

const server = express();
const port = (process.env.PORT || 8080);


server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());
// https://expressjs.com/en/guide/routing.html
server.use("/secure", secureEndpoints);



//CREATE USER
server.post("/user", async function (req, res) {
  
  const newUser = new user(req.body.username, req.body.password);
  
  console.log(newUser);
  await newUser.create();
  
  res.status(200).json(newUser).end();
  
});
 

//LOGIN USER

server.post("/user/login", async function (req, res) {
 // console.log(req.headers.authorization); // krypterte strengen brukeren sender inn

  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":"); // dekrypterer den krypterte strengen

  //console.log(username + ":" + password); // brukernavn, passord i ren tekst
  
  const requestUser = new user(username, password); // Hvem prøver å logge inn?
  const isValid = await requestUser.validate(); // Finnes vedkommende i DB og er det riktig passord?

  console.log(isValid); // isValid = true/false
  
  if(isValid){
    // let sessionToken = createToken(username);
     let sessionToken = 1234; //bare for nå siden vi ikke har laget ferdig token modulen
    res.status(200).json({"authToken":sessionToken, "user": requestUser}).end();
    console.log(requestUser);
    console.log(sessionToken);
  } else {
    res.status(403).json("unauthorized").end(); 
  }
})


//CREATE TASK
server.post("/user/task", async function (req, res) {

  const newTask = new task(req.body.task);
  
  await newTask.createTask();
  
  res.status(200).json(newTask).end();

})

//GET TASK !! NOT DONE
server.get("/user/task", async function (req, res) {
  try{
    let response = await db.getTask();
    res.status(200).json(response),end();
    console.table(response);

  }catch(error){
    console.error(error)
  }
  
  
  

})




server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});