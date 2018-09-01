const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express();

// session保存验证码 
//1 导包 引入 
//2 导入session中间件 设置生命周期
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));

// 路径判断 防止敏感页面未登录也能访问
app.all('/*', (req, res, next) => {
    if (req.url.includes('account')) {
        next();
    } else {
        if (req.session.isLogin) {
            next()
        } else {
            res.send('<script>alert("你还未登录");location.href="/account/login.html"</script>');
        }
    }
});


//需要先调用body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//导入路由文件
app.use('/account', require(path.join(__dirname, './routers/accountRouter.js')));
app.use('/student', require(path.join(__dirname, './routers/studentRouter.js')));

app.listen(2333, '127.0.0.1', (err) => {
    if (!err) {
        console.log('start success');
    }
});