require('dotenv').config();

const pgConfig = {
    "host": process.env.PG_HOST,
    "user": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DB,
    "port": 5432,
    "ssl": {
        rejectUnauthorized: false
      }
};

module.exports = pgConfig;
