const usersModels = require('../models/usersModels')
const config = require('../models/connection');
const pg = require('pg');

const getAll = async(req, res) => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM users`);
    const allUsers = db_data.rows;
    await connection.end();
    return res.status(200).json(allUsers);
};

const createUser = async(req, res) => {
    const {body} = req;
    usersModels.createUser(body);
    return res.status(200).json({message: "user created"});
};

const deleteUser = async( req, res) => {
    const {body} = req;
    usersModels.deleteUser(body.userId)
    return res.status(200).json({message: "user deleted"});
};

const updateUser = async(req, res) => {
    const {body} = req;
    usersModels.updateUser(body)
    return res.status(200).json({message: "user updated"});
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
};
