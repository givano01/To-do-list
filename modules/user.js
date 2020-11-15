const database = require("./datahandler")
const crypto = require('crypto');
const secret = process.env.hashSecret || require("../NEI").hashSecret;

class User {
    constructor(username, password) {
        this.username = username;
        this.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
         this.valid = false
    }

    async create() {
        
        try {
        
           let response = await database.insertUser("user", this.username, this.password);
        
        } catch (error) { 

            console.error(error)
        }
    }

}


module.exports = User
