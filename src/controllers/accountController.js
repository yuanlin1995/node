const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const captchapng = require('captchapng');

exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
}
//注册页面
exports.register = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}

//注册账号
exports.doRegist = (req, res) => {
    // 连接 URL
    const url = 'mongodb://localhost:27017';
    // 数据库名
    const dbName = 'xiaodiao';
    // Use connect method to connect to the server
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            //获取db对象
            const db = client.db(dbName);
            // 获得集合
            const collection = db.collection('accountInfo');
            // 查询单个文件
            collection.findOne({
                username: req.body.username
            }, (err, doc) => {
                const result = {
                    status: 0,
                    message: '注册成功'
                };
                if (doc) {
                    client.close();
                    result.status = 1;
                    result.message = '用户名已存在';
                    res.json(result);
                } else {
                    collection.insertOne(req.body, (err, res2) => {
                        client.close();
                        if (err) {
                            result.status = 2;
                            result.message = '注册失败';
                        }
                        res.send(result);
                    });
                }
            });
            //****关闭数据库需要写在异步内****
            // client.close();
        });
}

//获取验证码
exports.getvCode = (req, res) => {
    //添加验证码
    const vcode = parseInt(Math.random() * 9000 + 1000);
    //3 开始保存
    req.session.vcode = vcode;

    const p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    const img = p.getBase64();
    const imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};

//登录

exports.doLogin = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    };
    if (req.session.vcode != req.body.vcode) {
        result.status = 1;
        result.message = '验证码错误';
        res.send(result);
        return;
    } else {
        // Connection URL
        const url = 'mongodb://localhost:27017';
        // 数据库名
        const dbName = 'xiaodiao';
        // Use connect method to connect to the server
        MongoClient.connect(
            url, {
                useNewUrlParser: true
            },
            function (err, client) {
                //获取db对象
                const db = client.db(dbName);
                // 获得集合
                const collection = db.collection('accountInfo');
                // 查询单个文件
                collection.findOne({
                    username: req.body.username,
                    password: req.body.password
                }, (err, doc) => {
                    if (doc) {
                        client.close();
                        res.send(result);
                    } else {
                        result.status = 1;
                        result.message = '用户名或密码错误';
                        res.send(result);
                    }
                });
                //****关闭数据库需要写在异步内****
                // client.close();
            });
    }
}