const database = require("./datahandler");

class Task {
    constructor(task, id) {
        //this.username = username;
        this.task = task;
        this.id = id;
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
    async getTask() {
        try {
            let response = await database.getTask(this.task);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
    /*async deleteTask(){
        try {
            let response = await database.deleteTask(this.task);
            return response;
        } catch (error) {
            console.error(error)
        }

    }*/
}

module.exports = Task