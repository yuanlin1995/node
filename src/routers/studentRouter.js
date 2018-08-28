const express = require('express');
const path = require('path');

const router = express.Router();

const studentController = require(path.join(__dirname, '../controllers/studentController.js'));
router.get('/list.html', studentController.getList);

module.exports = router;