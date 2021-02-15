const express = require('express');
const bodyParser = require('body-parser');
const secureEndPoints = require("./modules/secureEndPoints")
const db = require("./modules/datahandler");
const user = require("./modules/user");
const userUpdate = require("./modules/user_update");
const task = require("./modules/task");
const list = require("./modules/list");
const auth = require("./modules/auth");


const createToken = require("./modules/token").create;

const server = express();
const port = (process.env.PORT || 8080);


server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());
server.use("/secure", secureEndPoints);

/* ------------------- CREATE USER ------------------ */

server.post("/user", async function (req, res) {
  
  const newUser = new user(req.body.username, req.body.password);
  
  console.log(newUser);
  await newUser.create();
  
  res.status(200).json(newUser).end();
  
});
 

/* ------------------- LOGIN USER ------------------ */

server.post("/user/login", async function (req, res) {
 
  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":"); 
  
  const requestUser = new user(username, password); 
  const valid = await requestUser.validate(); 

  if(valid){
     //let sessionToken = createToken(requestUser);
    let sessionToken = 1111  ; //midlertidig fordi token fungerer ikke enda
    res.status(200).json({"authToken":sessionToken, "user": requestUser}).end();
  } else {
    res.status(403).json("unauthorized").end(); 
  }
})

/* ------------------- UPDATE USER ------------------ */

server.put("/user/update", async function(req,res){
  const newUpdateUser = new userUpdate(req.body.username, req.body.password, req.body.updpassword);
  await newUpdateUser.update();
  res.status(200).json(newUpdateUser).end();
  console.log(req.body);
});


/* ------------------- DELETE USER ------------------ */

server.delete("/user/delete", async function(req, res){
  console.log(req.body.password);
  const credentials = req.body.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");
  const newDeleteUser = new user(username, password);

  await newDeleteUser.delete();
  res.status(200).json(newDeleteUser).end();
  console.log(req.body);
  console.log(req.body.username);
});


/* ------------------- CREATE TASK ------------------ */

server.post("/todo/task", async function (req, res) {
  const newTask = new task(req.body.task, req.body.list_id);
  
 let response = await newTask.createTask();
 newTask.id = response.id;
  
  res.status(200).json(newTask).end();

  console.log(req.body.list_id);

})

    /* ------------------- GET TASK ------------------ */

    server.get("/todo/task/:id", async function (req, res) {
      try {
        let {id} = req.params;
        let response = await db.getTask(id);
        res.status(200).json(response).end();
        console.log(id);
        } catch(error) {
          console.error(error)
        }
    })

  /* ------------------- DELETE TASK ------------------ */

  server.post('/todo/task/delete', async function (req, res) {
    const newDeleteTask = new task("", req.body.list_id, req.body.id);
    await newDeleteTask.deleteTask();
    res.status(200).json(newDeleteTask).end();
  })

  /* ------------------- CREATE LIST ------------------ */

server.post("/todo/list", async function (req, res) {

  const newList = new list(req.body.list);
  
  await newList.createList();
  
  res.status(200).json(newList).end();

})

   /* ------------------- GET LIST ------------------ */

   server.get("/todo/list", async function (req, res) {
    try{
      let response = await db.getList();
      res.status(200).json(response).end();
      }catch(error){
        console.error(error)
      }
  })


  /* ------------------- DELETE TASK ------------------ */

  server.post('/todo/list/delete', async function (req, res) {
    const newDeleteList = new list("", req.body.id);
    await newDeleteList.deleteList();
    res.status(200).json(newDeleteList).end();
  })




server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});