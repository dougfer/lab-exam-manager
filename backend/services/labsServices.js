const Model = require('../model/labsModel');
const Joi = require('joi');
const { ObjectId } = require('mongodb');


//criadas várias validações, mesmo que iguais, para demonstração.

const schema = Joi.object({
  labNome: Joi.string().min(1).required(),
  labCnpj: Joi.string().min(1).required(),
  labRua: Joi.string().min(1).required(),
  labNumero: Joi.string().min(1).required(),
  labBairro: Joi.string().min(1).required(),
  labEstado: Joi.string().min(1).required(),
  labCep: Joi.string().min(1).required(),
})


const create = async (array) => {

  array.map((lab) => lab.status = 'Ativo')

  const allLabs = await Model.getAll();
  array.map((lab) => {
    let validations;
    
    const {nome, CNPJ: cnj, Endereco: {rua, numero, bairro, estado, CEP}} = lab;

    validations = schema.validate({labNome: nome, labCnpj: cnj, labRua: rua, labNumero: numero, labBairro: bairro, labEstado: estado, labCep: CEP });

    if(validations.error) {
      throw new Error(JSON.stringify({
        message: 'Dados incorretos. Tente de novo',
        status: 400
      }))
    };

    const equalCNPJ = allLabs.find((lab) => lab.CNPJ === cnj);

    if (equalCNPJ) {
      throw new Error(JSON.stringify({
        message: `O CNPJ: ${equalCNPJ.CNPJ} já existe no sistema`,
        status: 405
      }))
    }

  })

  return Model.create(array);
};

const getAll = async () => {

  const result = await Model.getAll();

  return result.filter((lab) => lab.status === 'Ativo');
};


const getById = async (id) => {

  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Laboratório não encontrado",
      status: 404
    }));
  }

  const result = await Model.getById(id);

  if(!result) {
    throw new Error(JSON.stringify({
      message: "Laboratório não encontrado",
      status: 404
    }));
  }

  return result;
}

const updateById = async (id, obj) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Laboratório não encontrado",
      status: 404
    }));
  }


  // const validations = schema.validate({labNome: nome, labCnpj: CNPJ, labRua: rua, labNumero: numero, labBairro: bairro, labEstado: estado, labCep: CEP });

  // if (validations.error) {
  //   throw new Error(JSON.stringify({
  //     message: 'Dados incorretos. Tente de novo',
  //     status: 400
  //   }))
  // };

  const data = await Model.getById(id);

  const newObj = {
    ...data,
    ...obj,
  }

  await Model.updateById(id,newObj);

  const result = await Model.getById(id);

  return result;

};


// const deleteMany = async (obj) => {
//   return obj._id.forEach(async (id) => await Model.deleteById(ObjectId(id)));
//   // const newArray = array.map((id) => ObjectId(id._id));
//   // console.log(newArray);
//   // return Model.deleteMany(newArray);
// }

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: "Laboratório não encontrado",
      status: 404
    }));
  };

  const findFirst = await Model.getById(id);

  if (!findFirst) {
    throw new Error(JSON.stringify({
      message: "Laboratório não encontrado",
      status: 404
    }));
  };

  return Model.deleteById(id);
};



module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
