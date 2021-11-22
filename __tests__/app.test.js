const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app.js');
const Drawing = require('../lib/models/Drawing.js');

describe('breweries-crud-app routes', () => {
    const newDrawing = {
        title: 'Test Drawing 1',
        createdDate: '1999-01-09T08:00:00.000Z',
        timerSetting: 5,
        url: 'http://www.basecampbrewingco.com',
    };

    const newDrawing2 = {
        title: 'Test Drawing 2',
        createdDate: '1999-01-10T08:00:00.000Z',
        timerSetting: 10,
        url: 'http://www.basecampbrewingco.com',
    };

    beforeAll(() => {
        return setup(pool);
    });

    beforeEach(async () => {
        await Drawing.insert(newDrawing);
    });

    test('adds a drawing to the gallery', async (done) => {
        return request(app)
            .post('/api/v1/drawings')
            .send(newDrawing2)
            .then((res) => {
                expect(res.body).toEqual({
                    id: 2,
                    ...newDrawing2,
                });
                done();
            });
    });

    afterAll((done) => {
        return pool.end(done);
    });
});
