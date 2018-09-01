const path = require('path');
const captchapng = require('captchapng');
const databasetool = require(path.join(__dirname, '../tools/databasetool'));
exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
}
//注册页面
exports.register = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}

//注册账号
exports.doRegist = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    };
    databasetool.findOne('accountInfo', {
        username: req.body.username
    }, (err, doc) => {
        if (doc) {
            result.status = 1;
            result.message = '用户名已存在';
            res.json(result);
        } else {
            databasetool.insertOne('accountInfo', req.body, (err, res2) => {
                console.log(err, res2);
                if (err) {
                    result.status = 2;
                    result.message = '注册失败';
                } else {
                    res.send(result);
                }
            });
        }
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
        databasetool.findOne('accountInfo', { 
            username: req.body.username,
            password: req.body.password
        }, (err, doc) => {
            if (doc) {
                req.session.isLogin = req.body.username;
                res.send(result);
            } else {
                result.status = 1;
                result.message = '用户名或密码错误';
                res.send(result);
            }
        });
    }
}

//登出
exports.doLogout = (req, res) => {
    req.session.isLogin = null;
    res.send('<script>location.href="/account/login.html"</script>');
};
