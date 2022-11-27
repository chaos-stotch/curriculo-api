const config = require('../models/connection');
const findLocation = require('./findLocations')
const pg = require('pg');

const validateUserId = async(req, res, next) => {
    const {body} = req;
    if(body.userId === undefined){
        return res.status(400).json({message:'the field userId is required'});
    }
    if(body.userId === ''){
        return res.status(400).json({message:'userId cannot be empty'});
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

const validateCreateCurriculum = async(req, res, next) => {
    const {body} = req;
    if(body.title === undefined) {
        return res.status(400).json({message:'the field title is required'});
    };
    if(body.title === '') {
        return res.status(400).json({message:'title cannot be empty'});
    };
    if(body.dateYear === undefined) {
        return res.status(400).json({message:'the field dateYear is required'});
    };
    if(body.dateYear === '') {
        return res.status(400).json({message:'dateYear cannot be empty'});
    };
    if(body.institution === undefined) {
        return res.status(400).json({message:'the field institution is required'});
    };
    if(body.institution === '') {
        return res.status(400).json({message:'institution cannot be empty'});
    };
    if(body.localization === undefined) {
        return res.status(400).json({message:'the field localization is required'});
    };
    if(body.localization === '') {
        return res.status(400).json({message:'localization cannot be empty'});
    };
    if(body.category !== undefined) {
        const categoryList = ['individual', 'coletiva', 'especial', 'publica', 'premios', 'residenciais'];
        if(categoryList.includes(body.category.toLowerCase()) == false) {
            return res.status(400).json({message:'typo in category'});
        };
    };
    next();
    
};

const validateLocalization = async(body) => {
    var country = body.localization.country
    if(!country){
        country = ""
    }
    var state = body.localization.state
    if(!state){
        state = ""
    }
    var city = body.localization.city
    if(!city){
        city = ""
    }
    const localization = await findLocation(city, state, country)
    return localization
}

const validateCurriculumExists = async(req, res, next) => {
    const {body} = req;
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT userId FROM curriculum WHERE id=${body.id}`);
    const UID = db_data.rows;
    await connection.end();
    if(UID.length === 0){
        return res.status(400).json({message:'the curriculum does not exist'});
    }
    next();
};

const validateUpdateCurriculum = async(req, res, next) => {
    const {body} = req;
    if(body.title === '') {
        return res.status(400).json({message:'title cannot be empty'});
    };
    if(body.dateYear === '') {
        return res.status(400).json({message:'dateYear cannot be empty'});
    };
    if(body.institution === '') {
        return res.status(400).json({message:'institution cannot be empty'});
    };
    if(body.localization === '') {
        return res.status(400).json({message:'localization cannot be empty'});
    };
    if(body.category !== undefined) {
        const categoryList = ['individual', 'coletiva', 'especial', 'publica', 'premios', 'residenciais'];
        if(categoryList.includes(body.category.toLowerCase()) == false) {
            return res.status(400).json({message:'typo in category'});
        };
    };
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
    validateUserId,
    validateCreateCurriculum,
    validateCurriculumExists,
    validateUpdateCurriculum,
    validateBody,
    validateLocalization
};
