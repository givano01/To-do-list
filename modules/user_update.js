const database = require("./datahandler");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("../localenv").hashSecret;


class UpdateUser {

    constructor(username, updpassword) {
        this.username = username;
        this.updpassword= crypto.createHmac("sha256", secret)
            .update(updpassword)
            .digest("hex");
    }

    async update() {
        try {
            let response = await database.updateUser(this.username, this.updpassword);
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = UpdateUser;

