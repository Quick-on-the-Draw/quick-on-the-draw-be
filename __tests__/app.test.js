const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app.js');
const Drawing = require('../lib/models/Drawing.js');

describe('drawings routes', () => {
    const newDrawing = {
        title: 'Test Drawing 1',
        createdDate: '1999-01-09T08:00:00.000Z',
        timerSetting: 5,
        url: 'google.com',
    };

    beforeAll(() => {
        return setup(pool);
    });

    test('adds a drawing to the gallery', async (done) => {
        return request(app)
            .post('/api/v1/drawings')
            .send(newDrawing)
            .then((res) => {
                expect(res.body).toEqual(expect.any(Object));
                done();
            });
    });

    test('gets all drawings from gallery', async (done) => {
        return request(app)
            .get('/api/v1/drawings')
            .then((res) => {
                expect(res.body).toEqual(
                    expect.arrayContaining([expect.any(Object)])
                );
                done();
            });
    });

    afterAll((done) => {
        return pool.end(done);
    });
});
