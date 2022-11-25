const connection = require('../models/connection');

const validateUserId = async(req, res, next) => {
    const {body} = req;
    if(body.userId === undefined){
        return res.status(400).json({message:'the field userId is required'});
    }
    if(body.userId === ''){
        return res.status(400).json({message:'userId cannot be empty'});
    }
    const [userIDExists] = await connection.execute(`SELECT username FROM users WHERE userid=${body.userId}`);
    if(userIDExists.length === 0){
        return res.status(400).json({message:'the userId does not exist'});
    }
    next();
};

const validateCreateCurriculum = (req, res, next) => {
    const {body} = req;
    if(body.title === undefined){
        return res.status(400).json({message:'the field title is required'});
    }
    if(body.title === ''){
        return res.status(400).json({message:'title cannot be empty'});
    }
    if(body.dateYear === undefined){
        return res.status(400).json({message:'the field dateYear is required'});
    }
    if(body.dateYear === ''){
        return res.status(400).json({message:'dateYear cannot be empty'});
    }
    if(body.institution === undefined){
        return res.status(400).json({message:'the field institution is required'});
    }
    if(body.institution === ''){
        return res.status(400).json({message:'institution cannot be empty'});
    }
    if(body.localization === undefined){
        return res.status(400).json({message:'the field localization is required'});
    }
    if(body.localization === ''){
        return res.status(400).json({message:'localization cannot be empty'});
    }
    next();
}

module.exports = {
    validateUserId,
    validateCreateCurriculum
};
