const express = require('express');

const router = express.Router();

const curriculumController = require("./controllers/curriculumController");
const usersController = require("./controllers/usersController");
const commomMiddler = require("./middlewares/commomMiddlewares");
const curriculumMiddler = require("./middlewares/curriculumMiddlewares");
const usersMiddler = require("./middlewares/usersMiddlewares");

/*----------------curriculums----------------*/
router.get('/getAllCurriculums', curriculumController.getAll);

router.get('/getCurriculums',
    commomMiddler.validateBody,
    commomMiddler.validateUserId,
    curriculumController.getCurriculums);

router.post('/createCurriculum', 
    commomMiddler.validateBody,
    curriculumMiddler.validateCreateCurriculum, 
    commomMiddler.validateUserId, 
    curriculumController.createCurriculums);

router.put('/updateCurriculum',
    commomMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    commomMiddler.validateUserId, 
    curriculumMiddler.validateUpdateCurriculum, 
    curriculumController.updateCurriculum);

router.delete('/deleteCurriculum', 
    commomMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    commomMiddler.validateUserId, 
    curriculumController.deleteCurriculum);

/*----------------users----------------*/
router.get('/getAllUsers', usersController.getAll)

router.post('/createUser', 
    commomMiddler.validateBody,
    usersMiddler.validateCreateUser,
    usersController.createUser);

router.put('/updateUser',
    commomMiddler.validateBody,
    commomMiddler.validateUserId,
    usersMiddler.validateCreateUser,
    usersController.updateUser);

router.delete('/deleteUser', 
    commomMiddler.validateBody,
    commomMiddler.validateUserId, 
    usersController.deleteUser);

module.exports = router;
