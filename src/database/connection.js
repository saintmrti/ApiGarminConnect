const sql = require('mssql')

const dbSettings = {
    user: 'nuvahubadmin',
    password: 'Pastiseta2018',
    database: 'nuvahubdemo',
    server: 'nuvahubserver.database.windows.net',
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