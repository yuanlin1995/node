const path = require('path');

exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
}

exports.register = (req,res)=> {
    res.sendFile(path.join(__dirname,'../statics/views/register.html'));
}