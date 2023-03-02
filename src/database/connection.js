const sql = require('mssql')

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
    server: process.env.SERVER,
    // options: {
    //     encrypt: true,
    // },
}

module.exports.getConnection = async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch (error) {
        console.log(error)
    }
    
};