const moment = require('moment-timezone');

const { requestEndpoints } = require('../oauth/requestEndpoints');
const { postData } = require('../database/queries');

module.exports.telemetryController = async (res, req) => {
    try {
        let endTime= 1674280740;
        let startTime= endTime - 86340;
        let timestamp = `uploadStartTimeInSeconds=${startTime}&uploadEndTimeInSeconds=${endTime}`;

        let currentDate= moment().unix();

        // while (endTime < currentDate) {

        //     const merge = await requestEndpoints(timestamp);
        //     if (merge !== null && typeof merge !== "undefined") {
        //         await postData(merge);
        //     };
            
        //     startTime= endTime + 60;
        //     endTime= endTime + 86400;
        //     timestamp= `uploadStartTimeInSeconds=${startTime}&uploadEndTimeInSeconds=${endTime}`;
        // }

        let endTime2= currentDate - 60;
        startTime= endTime2 - 86400;
        timestamp= `uploadStartTimeInSeconds=${startTime}&uploadEndTimeInSeconds=${endTime2}`;
        console.log(timestamp);

        const merge = await requestEndpoints(timestamp);
        if (merge !== null && typeof merge !== "undefined") {
            await postData(merge);
        };

        console.log('Done');
    } catch (error) {
        console.log(error)
    }
}








