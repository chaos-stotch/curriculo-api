const config = require('../models/connection');
const pg = require('pg');

const validateUserId = async(req, res, next) => {
    const { body } = req;
    const userid = body.userid;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const isValidUUID = regexExp.test(userid);
    if(!isValidUUID) {
        return res.status(400).json({message:'invalid userid'});
    }
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT username FROM users WHERE userid='${userid}'`);
    const userIDExists = db_data.rows;
    await connection.end();
    if(userIDExists.length === 0){
        return res.status(400).json({message:'the userid does not exist'});
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