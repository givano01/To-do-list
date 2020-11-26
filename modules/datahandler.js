const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../NEI").credentials;

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }
    // Inserting user data to the database
    async insertUser(username, password) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    // Getting the user data from database
    async selectUser(username, password){
        const client = new pg.Client(this.credentials);
        let resp = null;
        let results = null;
        try{
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users" WHERE username=$1 AND password=$2', [username, password]);
            resp = (results.rows.length > 0) ? results.rows[0]:null;
            client.end();
        }catch(err){
            console.log(err);
        }

        return resp;        
    }

    //deleting the userdata from database

        async deleteUser(username){
                const client = new pg.Client(this.credentials);
            let results = null;
            try {
                await client.connect();
                results = await client.query('DELETE FROM "public"."users" WHERE "username =' + username);
                results = results.rows[0];
                client.end();
            } catch (err) {
                client.end();
                console.log(err);
                results = err;
            }

            return results;
        

        }  
        
        


    // Inserting a task data to  database
    async insertTask(task) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."todo-list"("task") VALUES($1) RETURNING *;', [task]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }


    //Getting all task data from database
    async getTask(task) {

        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."todo-list"');
            client.end();
            if(task == ""){
                console.log("There is no data here");
            }
            
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
        
    }
    async deleteTask(task){
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            //results = await client.query('DELETE FROM "public"."todo-list" WHERE "task" =' + task);
            results = await client.query('DELETE FROM "public"."todo-list" WHERE "task" =' + task);

            client.end();
            
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
        
    }
    
    
}

module.exports = new StorageHandler(dbCredentials);
