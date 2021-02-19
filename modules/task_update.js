const database = require("./datahandler");

class UpdateTask{

    constructor(task, new_task){
        this.task = task;
        this.new_task = new_task;
    }

    async updateTask(){
        try{
            let response = await database.updateTask(this.task, this.new_task);
           
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = UpdateTask