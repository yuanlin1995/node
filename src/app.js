const express = require('express');
const path = require('path');

const app = express();

//导入路由文件
app.use('/account',require(path.join(__dirname,'./routers/accountRouter.js')));


app.listen(2333, '127.0.0.1', (err) => {
    if (!err) {
        console.log('start success');
    }
});