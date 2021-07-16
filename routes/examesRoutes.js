const express = require('express');

const bodyParser = require('body-parser');

const controllers = require('../backend/controllers/examesController');

const router = express.Router();

router.use(bodyParser.json());

router.get('/search', controllers.getByExame);
router.post('/', controllers.create);
router.get('/', controllers.getAll);
router.put('/:id', controllers.updateById);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.deleteById);

module.exports = router;
