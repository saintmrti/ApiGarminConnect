const _ = require('lodash');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Mexico_City');

const { getConnection } = require('./connection');

const getLastDate = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(
            'SELECT MAX(fecha) as last_query_date FROM Multipak_telemetria_corporal'
        )
        const lastQueryDate = result.recordset[0].last_query_date;
        return lastQueryDate;
    } catch (error) {
        console.log(error)
    }
};

const postData = async (merge) => {
    try {
        const pool = await getConnection();
        const lastQueryDate = moment.utc(await getLastDate()).format('YYYY-MM-DD HH:mm:ss.SSS');

        _.map(merge, async ({ date, heartBeat, stepsDaily, stress, bodyBattery, pulse, breath}) => {
            const registerDate = moment.utc(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            if (registerDate > lastQueryDate) {
                console.log(registerDate);
                await pool.request().query(`
                    INSERT INTO Multipak_telemetria_corporal(idPulsera, fecha, 
                                                        heartBeat, stepsDaily, stress, bodyBattery, pulse, breath)
                    VALUES('1', '${date}', 
                        ${typeof heartBeat !== "undefined" ? heartBeat : "NULL"}, 
                        ${typeof stepsDaily !== "undefined" ? stepsDaily : "NULL"}, 
                        ${typeof stress !== "undefined" ? stress : "NULL"},
                        ${typeof bodyBattery !== "undefined" ? bodyBattery : "NULL"},
                        ${typeof pulse !== "undefined" ? pulse : "NULL"},
                        ${typeof breath !== "undefined" ? breath : "NULL"}
                    );
                `);
            };
        });

        // const query = `
        //     INSERT INTO Multipak_telemetria_corporal(idPulsera, fecha, heartBeat) VALUES
        //     ${ _.map(merge, ({ date, heartBeat }) => 
        //         `(1, '${date}', ${heartBeat ? heartBeat : 'NULL'})`
        //     ).join(',')}
        // `;
        // return {query};


    } catch (error) {
        console.log(error)
    }
};

module.exports.postData= postData;
module.exports.getLastDate = getLastDate;