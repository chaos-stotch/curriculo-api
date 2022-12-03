const config = require('../models/connection');
const pg = require('pg');

const validateUserId = async(req, res, next) => {
    const { id } = req.params

    if(isNaN(id)) {
        return res.status(400).json({message:'invalid userId'});
    }
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT username FROM users WHERE userid=${id}`);
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