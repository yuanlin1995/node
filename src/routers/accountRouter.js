const express = require('express');
const path = require('path');
const router = express.Router();

//将各功能分开导入各控制器

//导入account控制器
const accountController = require(path.join(__dirname, '../controllers/accountController.js'));

//导入account下的登录控制器
router.get('/login.html', accountController.login);

//导入注册控制器
router.get('/register.html', accountController.register);

router.post('/regist', accountController.doRegist);

router.post('/login', accountController.doLogin);

router.get('/vCode', accountController.getvCode);

module.exports = router;
