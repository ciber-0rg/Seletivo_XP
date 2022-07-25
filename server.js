require('dotenv').config();
const { response } = require('./server/app');
const app = require('./server/app');

// const PORT = process.env.PORT || 3307;

// app.get('/', (_req, res) => res.send('Processo Seletivo XP!'));

// app.listen(PORT, () => console.log('ouvindo porta', PORT));

app.set('port', (process.env.MYSQL_PORT || 3307));
app
    .get('/', function(_req, res) { res.send('Processo Seletivo XP!')})
    .listen(app.get('port'), function() {
        console.log('App is running, server is listening on port', app.get('port'));
    });
