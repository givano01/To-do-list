const database = require("./datahandler");

class List {
    constructor(list, id) {
        this.list = list;
        this.id = id;

    }

    async createList() {
        try {
        let response = await database.insertList(this.list);
            return response;
        } catch (error) { 
            console.error(error)
        }
    }

    async getList() {
        try {
            let response = await database.getList(this.list);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async deleteList(){
        try {
            let response = await database.deleteList(this.id);
            return response;
        } catch (error) {
            console.error(error)
        } 
    }
}

module.exports = List