const pool = require('./lib/utils/pool.js');
const setup = require('./data/setup.js');
const seedTables = require('./data/load-seed-data.js');

setup(pool)
    .catch((err) => console.error(err))
    .finally(() => process.exit());

seedTables();
