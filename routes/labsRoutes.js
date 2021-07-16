const express = require('express');

const bodyParser = require('body-parser');

const controllers = require('../backend/controllers/labsController');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', controllers.create);
router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.updateById);
router.delete('/:id', controllers.deleteById);

module.exports = router;
