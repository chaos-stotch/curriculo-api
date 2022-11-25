const express = require('express');

const router = express.Router();

const curriculumController = require("./controllers/curriculumController");

router.get('/tests', curriculumController.tests);

module.exports = router;
