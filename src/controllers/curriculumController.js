const curriculumModels = require('../models/curriculumModels')
const curriculumMiddler = require("../middlewares/curriculumMiddlewares");

const getAll = async(_req, res) => {
    const curriculum = await curriculumModels.getAll();
    return res.status(200).json(curriculum);
};

const getCurriculums = async(req, res) => {
    const {body} = req;
    const userId = body.userId;
    const curriculum = await curriculumModels.getCurriculums(userId);

    return res.status(200).json(curriculum);
};

const createCurriculums = async(req, res) => {
    const {body} = req;
    const localization = await curriculumMiddler.validateLocalization(body)
    if(localization.country === 'NULL') {
        return res.status(400).json({message: "location not found"});
    }
    const newCurriculum = {
        "userId":body.userId,
        "title":body.title,
        "category":body.category,
        "dateYear":body.dateyear,
        "institution":body.institution,
        "localization":localization
    };
    await curriculumModels.createCurriculum(newCurriculum);

    return res.status(200).json({message: "curriculum created"});
};

const deleteCurriculum = async(req, res) => {
    const {body} = req
    const id = body.id
    await curriculumModels.deleteCurriculum(id)
    return res.status(200).json({message: "curriculum deleted"});
}

const updateCurriculum = async(req, res) => {
    const {body} = req
    await curriculumModels.updateCurriculum(body)
    return res.status(200).json({message: "curriculum updated"});
}

module.exports = {
    getAll,
    getCurriculums,
    createCurriculums,
    deleteCurriculum,
    updateCurriculum
};
