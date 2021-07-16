const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (array) => {

  return connection()
    .then((db) => db.collection('labs').insertMany(array))
    .then((data) => data);

};

const getAll = async () => 
  connection().then((db) => db.collection('labs').find().toArray());

const getById = async (id) => 
  connection().then((db) => db.collection('labs').findOne(ObjectId(id)));

const updateById = async (id, obj) => {
  const {nome, CNPJ, status, Endereco: {rua, numero, bairro, estado, CEP}} = obj;

  return connection()
    .then((db) => db.collection('labs').updateOne({_id: ObjectId(id)}, {$set: {nome, CNPJ, status, Endereco: {rua, numero, bairro, estado, CEP}}}))

};

// const deleteMany = async (array) => 
//   connection().then((db) => db.collection('labs').deleteMany(array));
const deleteById = async (id) => 
  connection().then((db) => db.collection('labs').deleteOne({_id: (ObjectId(id))}));


module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
