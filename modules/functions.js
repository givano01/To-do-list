const pg = require("pg");
const db = process.env.DATABASE_URL || require("../NEI").credentials;
const express = require('express');
const router = express.router();

router.get('/', (req, res) => {
    db.any("SELECT id FROM user;").then(rows => {
        console.log(rows);
        res.json(rows)
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router;