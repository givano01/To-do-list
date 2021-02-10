const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    /*  -------------------------- Inserting user data ------------------------------- */

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

    
    /*  -------------------------- Getting the user data ------------------------------- */

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

/*  -------------------------- update user data ------------------------------- */

   async updateUser(username, updpassword, password){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('UPDATE "users" SET "password" = $3 WHERE "username" = $1 and "password" = $2',[username, password, updpassword]);
            client.end()
        }catch(err){
            client.end()
            console.log(err);
            results = err;
        }
        return results;
    }


     /*  -------------------------- Deleting user data ------------------------------- */

    async deleteUser(username, password) {
        const client = new pg.Client(this.credentials);
        let results = false;
        try {
            await client.connect();

            results = await client.query('SELECT * FROM "public".users" WHERE username=$1 AND password=$2', [username, password]);
            console.log(results.rows);
            if (results.rows.length !== 0) {
                if (results.rows[0].username === username && results.rows[0].password === password) {
                    await client.query('DELETE FROM "public"."users" WHERE username=$1 AND password=$2', [username, password]);
                    results = true;
                }

                return results;
            }
            client.end();
        } catch (err) {
            console.log(err);
        }
    }
        
        


    /*  -------------------------- Inserting task data ------------------------------- */

    async insertTask(task, list_id_url) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."todo_task"("task", "list_id") VALUES($1, $2) returning *;', [task, list_id_url]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }


     /*  -------------------------- Getting all task data ------------------------------- */

    async getTask(list_id) {

        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."todo_task" WHERE list_id = $1', [list_id]);
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

    /*  -------------------------- Deleting task data ------------------------------- */

    async deleteTask(id){
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            //results = await client.query('DELETE FROM "public"."todo-list" WHERE "task" =' + task);
            results = await client.query('DELETE FROM "public"."todo_task" WHERE "id" = $0');
           // results = await client.query('DELETE FROM "public"."todo-list" WHERE "id" = 135', [id]);


            client.end();
            
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
        
    }

    /*  -------------------------- Inserting list data ------------------------------- */

    async insertList(list) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."todo_list"("list") VALUES($1) RETURNING * ', [list]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    /*  -------------------------- Getting all list data ------------------------------- */

    async getList(list) {

        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."todo_list"');
            client.end();
            if(list == ""){
                console.log("There is no data here");
            }
            
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results; 
        
    }

    
    
}

module.exports = new StorageHandler(dbCredentials);
