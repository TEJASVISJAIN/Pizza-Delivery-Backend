//eslint v6.0
const {createPool} = require('mysql');

const db = createPool({
    host: 'localhost',
    database: 'convrseassign',
    user: 'root',
    password: 'root123',
    connectionLimit:10
});

// db.query("select * from users",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//         console.log("ERror connection to database");
//     }
//     else{
//         console.log(result);
//     }
// })

module.exports = db;
