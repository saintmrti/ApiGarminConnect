const app = require('./app');
const { telemetryController } = require('./controller/telemetry.controller');

// app.get('/', async (req, res) => {
//     await telemetryController();
//     res.send('Listo')
// });

console.log('Starting...');

setInterval(async () => {

    await telemetryController();
    
}, 20000);

app.listen(3000);