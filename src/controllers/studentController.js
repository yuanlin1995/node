const path = require('path');
const xtpl = require('xtpl');
const databasetool = require(path.join(__dirname, '../tools/databasetool'));

exports.getList = (req, res) => {
    const keyword = req.query.keyword || '';

    databasetool.find('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keyword,
            username: req.session.isLogin
        }, function (error, content) {
            res.send(content);
        });
    });
};

exports.getAddPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
        username: req.session.isLogin
    }, function (error, content) {
        res.send(content);
    });
};

exports.doAdd = (req, res) => { 
    databasetool.insertOne('studentInfo', req.body, (err, res1) => { 
        if (res1) { 
            res.send('<script>location.href="/student/list.html"</script>')
        } else { 
            res.send('<script>alert("新增失败)</script>'); 
        } 
    }); 
}; 

exports.getEditPage = (req, res) => { 
    //params 动态参数的获取 获取链接参数  
    //url127.0.0.1:2333/index.html/参数 
    //路由router.get('/account/nextPage.html/:param')  //冒号不能少 
    //通过req.params来取参数 
    databasetool.findOne('studentInfo', { 
        _id: databasetool.ObjectId(req.params.studentId) 
    }, (err, res1) => { 
        // console.log(res1); 
        xtpl.renderFile(path.join(__dirname, '../statics/views/edit.html'), { 
            data: res1, 
            username: req.session.isLogin 
        }, function (error, content) { 
            res.send(content); 
        }); 
    });  
}; 

exports.doEdit = (req, res) => {
    databasetool.updateOne('studentInfo', {
        _id: databasetool.ObjectId(req.params.studentId)
    }, req.body, (err, res1) => {
        if (res1) {
            res.send('<script>location.href="/student/list.html"</script>');
        }
    });
};

exports.doDelete = (req, res) => {
    console.log(req.params);
    databasetool.deleteOne('studentInfo', {
        _id: databasetool.ObjectId(req.params.studentId)
    }, (err, res1) => {
        if (res1) {
            res.send('<script>location.href="/student/list.html"</script>');
        }
    });
};