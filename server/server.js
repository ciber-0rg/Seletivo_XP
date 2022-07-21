require('dotenv').config();
const { response } = require('./app');
const app = require('./app');

const port = process.env.MYSQL_PORT || 3307;

app.get('/', (_req, res) => response.send());

app.listen(port, () => console.log('ouvindo porta', port));