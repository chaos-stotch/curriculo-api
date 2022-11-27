const config = require('../models/connection');
const findLocation = require('./findLocations')
const pg = require('pg');

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
    if(body.dateYear.length != 4 || isNaN(body.dateYear)) {
        return res.status(400).json({message:'invalid year format'});
    }
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
    if(body.id === ''){
        return res.status(400).json({message:'id cannot be empty'});
    }
    if(body.id === undefined){
        return res.status(400).json({message:'the field id is required'});
    }
    if(isNaN(body.id)){
        return res.status(400).json({message:'invalid id'});
    }
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM curriculum WHERE id=${body.id}`);
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
    if(body.dateYear !== undefined) {
        if(body.dateYear.length != 4 || isNaN(body.dateYear)) {
            return res.status(400).json({message:'invalid year format'});
        }
    }
    next();
};

module.exports = {
    validateCreateCurriculum,
    validateCurriculumExists,
    validateUpdateCurriculum,
    validateLocalization
};
