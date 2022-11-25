const curriculumModels = require('../models/curriculumModels')

const tests = async(_req, res) => {

    const curriculum = await curriculumModels.getAll();

    return res.status(200).json(curriculum);
};

module.exports = {
    tests
}
