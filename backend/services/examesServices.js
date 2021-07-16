const Model = require('../model/examesModel');
const LabModel = require('../model/labsModel');

const Joi = require('joi');
const { ObjectId } = require('mongodb');


const schema = Joi.object({
  exNome: Joi.string().min(1).required(),
  exTipo: Joi.string().min(1).required(),
  exLab: Joi.array().required(),
});

const create = async (array) => {
  array.map((exame) => exame.status = 'Ativo');

  array.map((exame) => {
    let validations;

    const { nome, tipo, laboratorio } = exame;

    if (tipo !== "Análise" && tipo !== "Clínica" && tipo !== "Imagem") {
      throw new Error(JSON.stringify({
        message: 'Os tipos de exames são: Análise, Clínica ou Imagem',
        status: 400
      }))
    }

    validations = schema.validate({exNome: nome, exTipo: tipo, exLab: laboratorio});

    if(validations.error) {
      throw new Error(JSON.stringify({
        message: 'Dados incorretos. Tente de novo',
        status: 400
      }))
    };

  })
  return Model.create(array);
}

const getAll = async () => {

  const result = await Model.getAll();

  return result.filter((exam) => exam.status === 'Ativo');
};

const updateById = async (id, obj) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  }

  const data = await Model.getById(id);

  const newObj = {
    ...data,
    ...obj,
    ...obj.laboratorio
  }

  await Model.updateById(id,newObj);

  const result = await Model.getById(id);

  return result;
}

const getById = async(id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  }

  const result = await Model.getById(id);

  if(!result) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  }
  return result;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  };

  const findFirst = await Model.getById(id);

  if (!findFirst) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  };

  return Model.deleteById(id);
};

const getByExame = async (exame) => {
  const allExames = await Model.getAll();
  const allLabs = await LabModel.getAll();

  const exam = allExames.find((singleExame) => singleExame.nome === exame);
  
  if (!exam) {
    throw new Error(JSON.stringify({
      message: "Exame não encontrado",
      status: 404
    }));
  }
  
  const result = allLabs.filter((lab) => exam.laboratorio.includes(lab._id.toString()));

  return result;
}


module.exports = {
  create,
  getAll,
  updateById,
  getById,
  deleteById,
  getByExame
};
