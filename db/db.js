const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ghd'
});

con.connect(function(err){
    if (err) throw err;
    console.log('DB connected!');
});

module.exports = con;