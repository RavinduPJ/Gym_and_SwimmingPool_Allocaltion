const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'postgres',
    password: 'RAvipraBa0104*',
    host: 'localhost',
    port: '5432',
    database: 'GASA'
});

module.exports = pool;
