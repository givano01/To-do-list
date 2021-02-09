const database = require("./datahandler");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("../localenv").hashSecret;


class UpdateUser{

    constructor(username, password, updpassword) {
        this.username = username;
        this.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.valid = false;
        this.updpassword= crypto.createHmac("sha256", secret)
            .update(updpassword)
            .digest("hex");
    }

    async update(){
        try{
            let response = await database.updateUser(this.username, this.password, this.updpassword);
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = UpdateUser;

