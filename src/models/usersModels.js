const config = require('./connection');
const pg = require('pg')

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

const updateUser = async(curriculum) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`UPDATE users
        SET username = '${curriculum.userName}'
        WHERE userid = '${curriculum.userId}'`);
}

module.exports = {
    createUser,
    deleteUser,
    updateUser
}
