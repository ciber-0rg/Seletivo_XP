require('dotenv').config();
const { response } = require('./server/app');
const app = require('./server/app');

const port = process.env.MYSQL_PORT || 3307;

app.get('/', (_req, res) => res.send('Processo Seletivo XP!'));

app.listen(port, () => console.log('ouvindo porta', port));