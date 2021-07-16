const Service = require('../services/examesServices');

const create = async (req, res) => {
  try {
    await Service.create(req.body);
    res.status(201).json({result: req.body});
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData})
  }
};

const getAll = async (req, res) => {
  try {
    const result = await Service.getAll();
    res.status(200).json({result})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const updateById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateById(id, req.body);
    res.status(200).json({result})
  } catch (error) {
    console.log(error)
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData})
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getById(id);
    res.status(200).json({result})
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData});
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Service.deleteById(id);
    res.status(204);
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData});
  }
};

const getByExame = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await Service.getByExame(q);
    res.status(200).json({result})
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData});
  }
}

module.exports = {
  create,
  getAll,
  updateById,
  getById,
  deleteById,
  getByExame
};
