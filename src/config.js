const { config } = require('dotenv');

config();

module.exports = {
    port: process.env.PORT || 3000,
    endTime: process.env.ENDTIME
};