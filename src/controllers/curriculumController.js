const curriculumModels = require('../models/curriculumModels')

const tests = async(_req, res) => {
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
    const newCurriculum = {
        "userId":body.userId,
        "title":body.title,
        "category":body.category,
        "dateYear":body.dateyear,
        "institution":body.institution,
        "localization":body.localization
    };
    const curriculum = await curriculumModels.createCurriculum(newCurriculum);

    return res.status(200).json(curriculum);
};

module.exports = {
    tests,
    getCurriculums,
    createCurriculums
};
