const Service = require('../services/labsServices');

const create = async (req, res) => {
  try {
    await Service.create(req.body);
    res.status(201).json({result: req.body})
  } catch (e){
    const errorData = JSON.parse(e.message);
    res.status(errorData.status).json({error: errorData})
  }
};

const getAll = async (req, res) => {
  try {
    const result = await Service.getAll();
    res.status(200).json({result})
  } catch (error) {
    res.status(500).json({err: error.message})
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

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateById(id, req.body);
    // console.log(result)
    res.status(200).json({result})
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData})
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Service.deleteById(id);
    res.status(204).json();
  } catch (error) {
    const errorData = JSON.parse(error.message);
    res.status(errorData.status).json({error: errorData});
  }
};

// const deleteMany = async (req, res) => {
//   try {
//     const result = await Service.deleteMany(req.body);
//     console.log(result);
//     return res.status(204);
//   } catch (error) {
//     console.log(error)
//   }
// };

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}