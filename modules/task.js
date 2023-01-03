const database = require("./datahandler");

class Task {
    constructor(task, list_id, id) {
        this.task = task;
        this.id = id;
        this.list_id = list_id;
    }

    async createTask() {
        try {
        let response = await database.insertTask(this.task, this.list_id);
            return response;
        } catch (error) { 
            console.error(error)
        }
    }


    async getTask() {
        try {
            let response = await database.getTask(this.task, this.list_id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async deleteTask(){
        try {
            let response = await database.deleteTask(this.id);
            return response;
        } catch (error) {
            console.error(error)
        } 
    }
}

module.exports = Task