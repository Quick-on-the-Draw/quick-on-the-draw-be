const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fave = require('../lib/model/Fave');
const { getWebsite } = require('../lib/utils/breweries.js');

jest.mock('../lib/utils/breweries');

describe('breweries-crud-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await Fave.insert({ name: 'Base Camp Brewing', type: 'micro', city: 'Portland', state: 'Oregon', website: 'http://www.basecampbrewingco.com' })
  });

  
  it('adds a brewery to favorites', () => {
    getWebsite.mockResolvedValue('http://www.breakside.com');

    const newBrew = {name: 'Breakside Brewery', type: 'micro', city: 'Portland', state: 'Oregon' };

    return request(app)
      .post('/api/v1/favorites')
      .send(newBrew)
      .then((res) => {
        expect(getWebsite).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({id: '2', ...newBrew, website: 'http://www.breakside.com'});
      })
  })

  it('gets all breweries in favorites', () => {
    const existingBrew = { name: 'Base Camp Brewing', type: 'micro', city: 'Portland', state: 'Oregon', website: 'http://www.basecampbrewingco.com' };

    return request(app)
      .get('/api/v1/favorites')
      .then((res) => {
        expect(res.body).toEqual([{ id: '1', ...existingBrew }]);
      })
  })

  it('gets a favorite by id', () => {
    const existingBrew = { id: '1', name: 'Base Camp Brewing', type: 'micro', city: 'Portland', state: 'Oregon', website: 'http://www.basecampbrewingco.com' };

    return request(app)
      .get('/api/v1/favorites/1')
      .then((res) => {
        expect(res.body).toEqual(existingBrew);
      })
  })

  it('updates a favorite', () => {
    const updatedBrew = { id: '1', name: 'Base Camp Brewing', type: 'macro', city: 'Portland', state: 'Oregon', website: 'http://www.basecampbrewingco.com' };

    return request(app)
      .put('/api/v1/favorites/1')
      .send(updatedBrew)
      .then((res) => {
        expect(res.body).toEqual(updatedBrew);
      })
  })

  it('deletes a favorite', () => {
    const deletedBrew = { id: '1', name: 'Base Camp Brewing', type: 'micro', city: 'Portland', state: 'Oregon', website: 'http://www.basecampbrewingco.com' };

    return request(app)
      .delete('/api/v1/favorites/1')
      .then((res) => {
        expect(res.body).toEqual(deletedBrew);
      })
  })
});
