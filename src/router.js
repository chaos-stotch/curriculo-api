const express = require('express');

const router = express.Router();

const curriculumController = require("./controllers/curriculumController");
const usersController = require("./controllers/usersController");
const commomMiddler = require("./middlewares/commomMiddlewares");
const curriculumMiddler = require("./middlewares/curriculumMiddlewares");
const usersMiddler = require("./middlewares/usersMiddlewares");

/*----------------curriculums----------------*/
router.get('/curriculums', curriculumController.getAll);

router.get('/curriculums/get/',
    commomMiddler.validateBody,
    commomMiddler.validateUserId,
    curriculumController.getCurriculums);

router.post('/curriculums/create', 
    commomMiddler.validateBody,
    commomMiddler.validateUserId, 
    curriculumMiddler.validateCreateCurriculum, 
    curriculumController.createCurriculums);

router.put('/curriculums/update',
    commomMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    commomMiddler.validateUserId,
    curriculumMiddler.validateUpdateCurriculum, 
    curriculumController.updateCurriculum);

router.delete('/curriculums/delete', 
    commomMiddler.validateBody,
    curriculumMiddler.validateCurriculumExists, 
    commomMiddler.validateUserId, 
    curriculumController.deleteCurriculum);

/*----------------users----------------*/
router.get('/users', usersController.getAll)

router.post('/users/create', 
    commomMiddler.validateBody,
    usersMiddler.validateCreateUser,
    usersMiddler.checkDuplicate,
    usersController.createUser);

router.put('/users/update/',
    commomMiddler.validateBody,
    commomMiddler.validateUserId,
    usersMiddler.validateCreateUser,
    usersMiddler.checkDuplicate,
    usersController.updateUser);

router.delete('/users/delete/',
    commomMiddler.validateBody,
    commomMiddler.validateUserId, 
    usersController.deleteUser);

module.exports = router;
