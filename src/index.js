const app = require('./app');
const { telemetryController } = require('./controller/telemetry.controller');

// app.get('/', async (req, res) => {
//     await telemetryController();
//     res.send('Listo')
// });

console.log('Starting...');

setInterval(async () => {

    await telemetryController();
    
}, 6 * 60 * 60 * 1000);

app.listen(3000);