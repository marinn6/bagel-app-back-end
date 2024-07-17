const pgp = require('pg-promise')()
require('dotenv').config()

//cn = connection. pgp helps use connect to postgres database

const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD
};

const db = pgp(cn);

module.exports = db;