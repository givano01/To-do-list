const database = require("./datahandler");

class Task {
    constructor(task, id) {
        this.task = task;
        this.id = id;

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
   /* async deleteTask(){
        try {
            let response = await database.deleteTask(this.task);
            return response;
        } catch (error) {
            console.error(error)
        }

    }*/
}

module.exports = Task