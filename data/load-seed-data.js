const pool = require('../lib/utils/pool.js');

const seedTables = async () => {
    const seedDrawings = [
        {
            title: 'Seed Drawing 1',
            createdDate: '1999-01-09T08:00:00.000Z',
            timerSetting: 10,
            url: 'google.com',
        },
        {
            title: 'Seed Drawing 2',
            createdDate: '1999-01-09T08:00:00.000Z',
            timerSetting: 5,
            url: 'google.com',
        },
    ];

    await seedDrawings.map(async (drawing) => {
        return await pool.query(
            `
                INSERT INTO drawings (title, created_date, timer_setting, url) VALUES ($1, $2, $3, $4);
                `,
            [
                drawing.title,
                drawing.createdDate,
                drawing.timerSetting,
                drawing.url,
            ]
        );
    });
};

module.exports = seedTables;
