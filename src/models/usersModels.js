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

const createUser = async(curriculum) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`INSERT INTO users (username) 
        VALUES ('${curriculum.userName}');`)
    connection.end()
};

const deleteUser = async(id) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`DELETE FROM users WHERE userid = ${id}`)
    connection.end()
}

const updateUser = async(id, curriculum) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`UPDATE users
        SET username = '${curriculum.userName}'
        WHERE userid = '${id}'`);
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
}
