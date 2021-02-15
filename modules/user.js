const database = require("./datahandler");
const crypto = require('crypto');
const secret = process.env.hashSecret || require("../localenv").hashSecret;

class User {
    constructor(username, password) {
        this.username = username;
        this.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.valid = false;
    }

    async create() {
        try {
            let response = await database.insertUser(this.username, this.password);
            return response;
        } catch (error) { 
            console.error(error)
        }
    }
    
    async validate() {
      let success = false;
      try {
            let response = await database.selectUser(this.username, this.password);

            if(response != null){
              this.isValid = true;
              success = true;
            }
        } catch(error) {
            console.log(error);
        }
      return success;
    }

    async delete(){
        try{
            let response = await database.deleteUser(this.username,this.password);
            
        }catch(error){
            console.error(error)
        }
    }
    

}


module.exports = User
