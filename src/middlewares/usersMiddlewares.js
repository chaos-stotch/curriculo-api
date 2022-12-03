const config = require('../models/connection');
const pg = require('pg')

const validateCreateUser = async(req, res, next) => {
    const {body} = req;
    if(body.username === undefined) {
        return res.status(400).json({message:'the field username is required'});
    };
    if(body.username === '') {
        return res.status(400).json({message:'username cannot be empty'});
    };
    next();
};

const checkDuplicate = async(req, res, next) => {
    const {body} = req;
    const connection = new pg.Client(config);
    await connection.connect();
    const dbData = await connection.query(`SELECT * FROM users WHERE username='${body.username}'`);
    const repeatedUser = dbData.rows;
    await connection.end();
    if(repeatedUser.length != 0) {
        return res.status(400).json({message:'username not available'});
    };
    next();
}

module.exports = {
    validateCreateUser,
    checkDuplicate
}
