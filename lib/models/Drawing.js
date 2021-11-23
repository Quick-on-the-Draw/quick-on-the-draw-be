const pool = require('../utils/pool.js');

module.exports = class Drawing {
    id;
    title;
    createdDate;
    timerSetting;
    url;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.createdDate = row.created_date;
        this.timerSetting = row.timer_setting;
        this.url = row.url;
    }

    static async insert({ title, createdDate, timerSetting, url }) {
        const { rows } = await pool.query(
            `
              INSERT into drawings (title, created_date, timer_setting, url) VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, createdDate, timerSetting, url]
        );

        return new Drawing(rows[0]);
    }

    static async get() {
        const { rows } = await pool.query(
            `
            SELECT * from drawings
          `
        );
        return rows.map((row) => new Drawing(row));
    }
};
