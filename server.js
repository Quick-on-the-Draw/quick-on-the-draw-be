const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
    // eslint-disable-next-line no-console
    console.log('Goodbye!');
    pool.end();
});
