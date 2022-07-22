require('dotenv').config();
const { response } = require('./server/app');
const app = require('./server/app');

const port = process.env.MYSQL_PORT || 3306;

app.get('/', (_req, res) => response.send());

app.listen(port, () => console.log('ouvindo porta', port));