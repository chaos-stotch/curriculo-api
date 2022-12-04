const curriculumModels = require('../models/curriculumModels')
const curriculumMiddler = require("../middlewares/curriculumMiddlewares");

const getAll = async(_req, res) => {
    const curriculum = await curriculumModels.getAll();
    return res.status(200).json(curriculum);
};

const getCurriculums = async(req, res) => {
    const {userid} = req.body;
    const curriculum = await curriculumModels.getCurriculums(userid);
    return res.status(200).json(curriculum);
};

const createCurriculums = async(req, res) => {
    const {body} = req;
    const localization = await curriculumMiddler.validateLocalization(body)
    if(localization.country === 'NULL') {
        return res.status(400).json({message: "location not found"});
    }
    const newCurriculum = {
        "userId":body.userid,
        "title":body.title,
        "category":body.category,
        "dateYear":body.dateYear,
        "institution":body.institution,
        "localization":localization
    };
    await curriculumModels.createCurriculum(newCurriculum);

    return res.status(200).json({message: "register created"});
};

const deleteCurriculum = async(req, res) => {
    const {body} = req
    const id = body.id
    await curriculumModels.deleteCurriculum(id)
    return res.status(200).json({message: "register deleted"});
}

const updateCurriculum = async(req, res) => {
    const {body} = req
    var localization = undefined
    if(body.localization !== undefined) {
        localization = await curriculumMiddler.validateLocalization(body)
        if(localization.country === 'NULL') {
            return res.status(400).json({message: "location not found"});
        }
    }
    const newCurriculum = {
        "userId":body.userId,
        "id": body.id,
        "title":body.title,
        "category":body.category,
        "dateYear":body.dateYear,
        "institution":body.institution,
        "localization":localization
    };
    await curriculumModels.updateCurriculum(newCurriculum)
    return res.status(200).json({message: "register updated"});
}

const getCategories = async(req, res) => {
    return res.status(400).json({categories: ['individual', 'coletiva', 'especial', 'publica', 'premios', 'residenciais']});
}

module.exports = {
    getAll,
    getCurriculums,
    createCurriculums,
    deleteCurriculum,
    updateCurriculum,
    getCategories
};
