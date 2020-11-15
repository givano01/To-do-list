const database = require("./datahandler");
const crypto = require('crypto');
const secret = process.env.hashSecret || require("../NEI").hashSecret;

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
    
    async update(){
    
    }

    async delete(){
      
    }

    async validate(){
      let success = false;
      try{
            let resp = await database.selectUser(this.username, this.password);

            if(resp != null){
              this.isValid = true;
              success = true;
              // Her kan vi populere andre felter i user objektet
              // Eks this.email = resp.email (eller lignende)
            }
        }catch(err){
            console.log(err);
        }
      return success;
    }

}


module.exports = User
