const config = require('./connection');
const pg = require('pg')

const getAll = async() => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM users`);
    const allUsers = db_data.rows;
    await connection.end();
    return allUsers;
}

const createUser = async(username) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`INSERT INTO users (username) 
        VALUES ('${username}');`)
    connection.end()
};

const deleteUser = async(userid) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`DELETE FROM users WHERE userid = '${userid}'`)
    connection.end()
}

const updateUser = async(userid, username) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`UPDATE users
        SET username = '${username}'
        WHERE userid = '${userid}'`);
    connection.end()
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
}
