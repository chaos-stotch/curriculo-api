const express = require('express');

const router = express.Router();

const curriculumController = require("./controllers/curriculumController");
const curriculumMiddler = require("./middlewares/curriculumMiddlewares");

router.get('/tests', curriculumController.tests);
router.get('/getCurriculums', curriculumMiddler.validateUserId, curriculumController.getCurriculums);
router.post('/createCurriculum', curriculumMiddler.validateUserId, curriculumMiddler.validateCreateCurriculum, curriculumController.createCurriculums);

module.exports = router;
