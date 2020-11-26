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
 
  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":"); 
  
  const requestUser = new user(username, password); 
  const valid= await requestUser.validate(); 

  console.log(valid);
  
  if(valid){
    let sessionToken = createToken(requestUser);
     //let sessionToken = 1111  ; //bare for nå siden vi ikke har laget ferdig token modulen
    res.status(200).json({"authToken":sessionToken, "user": requestUser}).end();
  } else {
    res.status(403).json("unauthorized").end(); 
  }
})

//DELETE USER



//CREATE TASK
server.post("/user/task", async function (req, res) {

  const newTask = new task(req.body.task);
  
  await newTask.createTask();
  
  res.status(200).json(newTask).end();

})

  //GET TASK
  server.get("/user/task", async function (req, res) {
    try{
      let response = await db.getTask();
      res.status(200).json(response).end();
      }catch(error){
        console.error(error)
      }
  })

  //DELETE TASK
  server.post('/user/task/delete', async function (req, res) {
    const newDeleteTask = new task(req.body.task);

    await newDeleteTask.deleteTask();
    res.status(200).json(newDeleteTask).end();
  })




server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});