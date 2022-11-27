const express = require('express');

const router = express.Router();

const curriculumController = require("./controllers/curriculumController");
const curriculumMiddler = require("./middlewares/curriculumMiddlewares");

router.get('/tests', curriculumMiddler.validateBody, curriculumController.tests);

router.get('/getCurriculums',
    curriculumMiddler.validateBody,
    curriculumMiddler.validateUserId,
    curriculumController.getCurriculums);

router.post('/createCurriculum', 
    curriculumMiddler.validateBody,
    curriculumMiddler.validateCreateCurriculum, 
    curriculumMiddler.validateUserId, 
    curriculumController.createCurriculums);

router.put('/updateCurriculum',
    curriculumMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    curriculumMiddler.validateUserId, 
    curriculumMiddler.validateUpdateCurriculum, 
    curriculumController.updateCurriculum);

router.delete('/deleteCurriculum', 
    curriculumMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    curriculumMiddler.validateUserId, 
    curriculumController.deleteCurriculum);

module.exports = router;
