const express = require("express")
const authenticator = require("./auth");


let hemmelig = express.Router();
hemmelig.use(authenticator);


hemmelig.get("/", (req, res, next) => {

 }) 

haha

module.exports = hemmelig;