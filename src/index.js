const app = require('./app');
const { telemetryController } = require('./controller/telemetry.controller');

app.listen(app.get('port'));

const startApp = async () => {
    console.log('Starting...');
    await telemetryController();
    process.exit();
};

startApp();