const config = require('../models/connection');
const pg = require('pg');

const validateUserId = async(req, res, next) => {
    const {body} = req;
    if(body.userId === undefined) {
        return res.status(400).json({message:'the field userId is required'});
    }
    if(body.userId === '') {
        return res.status(400).json({message:'userId cannot be empty'});
    }
    if(isNaN(body.userId)) {
        return res.status(400).json({message:'invalid userId'});
    }
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT username FROM users WHERE userid=${body.userId}`);
    const userIDExists = db_data.rows;
    await connection.end();
    if(userIDExists.length === 0){
        return res.status(400).json({message:'the userId does not exist'});
    }
    next();
};

const validateBody = (req, res, next) => {
    const {body} = req;
    if(Object.keys(body).length === 0) {
        return res.status(400).json({message:'empty body'});
    };
    next();
}

module.exports = {
    validateBody,
    validateUserId
}