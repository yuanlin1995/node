const express = require('express');
const path = require('path');
const router = express.Router();

const studentController = require(path.join(__dirname, '../controllers/studentController.js'));

router.get('/list.html', studentController.getList);

router.get('/getEditPage/:studentId', studentController.getEditPage);

router.get('/add.html', studentController.getAddPage);

router.post('/add', studentController.doAdd);

router.get('/edit.html/:studentId', studentController.getEditPage);

router.post('/edit/:studentId', studentController.doEdit);

router.get('/delete/:studentId', studentController.doDelete);

module.exports = router;