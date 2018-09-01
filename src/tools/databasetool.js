const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

exports.ObjectId = ObjectId;

// 连接 URL
const url = 'mongodb://localhost:27017';
// 数据库名
const dbName = 'xiaodiao';
// Use connect method to connect to the server

//只有当取到了数据后,

function connectMongoDB(collectionName, callback) {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            //获取db对象
            const db = client.db(dbName);
            // 获得集合
            const collection = db.collection(collectionName);
            //通过异步回调函数传出    err   client   collection    
            callback(err, client, collection);
        });
}

exports.find = (collectionName, params, callback) => {
    connectMongoDB(collectionName, (err, client, collection) => {
        // 查询单个文件
        collection.find(params).toArray((err, docs) => {
            client.close();
            //xtemplate xtpl 实现html页面模板继承,并渲染和获取文件
            callback(err, docs);
        });
        //****关闭数据库需要写在异步内****
        // client.close();
    });
}

exports.findOne = (collectionName, params, callback) => {
    connectMongoDB(collectionName, (err, client, collection) => {
        collection.findOne(params, (err, docs) => {
            client.close();
            //xtemplate xtpl 实现html页面模板继承,并渲染和获取文件
            callback(err, docs)
        });
        //****关闭数据库需要写在异步内****
        // client.close();
    });
}

exports.insertOne = (collectionName, params, callback) => {
    connectMongoDB(collectionName, (err, client, collection) => {
        collection.insertOne(params, (err, res) => {
            client.close();
            //xtemplate xtpl 实现html页面模板继承,并渲染和获取文件
            callback(err, res);
        });
    });
    //****关闭数据库需要写在异步内****
    // client.close();
};

exports.updateOne = (collectionName, condition, params, callback) => {
    connectMongoDB(collectionName, (err, client, collection) => {
        collection.updateOne(condition, {
            $set: params
        }, (err, res) => {
            client.close();
            callback(err, res);
        });
    });
};  

exports.deleteOne = (collectionName, params, callback) => {
    connectMongoDB(collectionName, (err, client, collection) => {
        collection.deleteOne(params, (err, res) => {
            client.close();
            callback(err, res);
        });
    });
};