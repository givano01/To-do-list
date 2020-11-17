const database = require("./datahandler");

class Task {
    constructor( task) {
        //this.username = username;
        this.task = task;
        /*his.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.valid = false;*/
    }



    async createTask() {
            
        try {
        
        let response = await database.insertTask(this.task);
            return response;

        } catch (error) { 

            console.error(error)
        }
    }

}

module.exports = Task