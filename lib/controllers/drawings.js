const { Router } = require('express');
const DrawingService = require('../services/DrawingService.js');

module.exports = Router().post('/', async (req, res, next) => {
    DrawingService.create(req.body)
        .then((drawing) => res.send(drawing))
        .catch(next);
});
