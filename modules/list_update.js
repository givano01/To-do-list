const database = require("./datahandler");

class UpdateList{

    constructor(list, new_list){
        this.list = list;
        this.new_list = new_list;
    }

    async updateList(){
        try{
            let response = await database.updateList(this.list, this.new_list);
        }catch(error){
            console.error(error)
        }
    }


}

module.exports = UpdateList