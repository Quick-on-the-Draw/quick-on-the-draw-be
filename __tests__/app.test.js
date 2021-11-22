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

  const newDrawing2 = {
    title: 'Test Drawing 2',
    createdDate: '1999-01-10T08:00:00.000Z',
    timerSetting: 10,
    url: 'github.com',
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
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 2,
            title: 'Test Drawing 2',
            timerSetting: 10,
            url: 'github.com',
          })
        );
        done();
      });
  });

  test('gets all drawings from gallery', async (done) => {
    return request(app)
      .get('/api/v1/drawings')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: 2,
              title: 'Test Drawing 2',
              timerSetting: 10,
              url: 'github.com',
            }),
          ])
        );
        done();
      });
  });

  afterAll((done) => {
    return pool.end(done);
  });
});
