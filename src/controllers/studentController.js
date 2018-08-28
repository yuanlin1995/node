const path = require('path');

exports.getList = (req, res) => {
    res.sendFile(path.join(__dirname,'../statics/views/list.html'));
};