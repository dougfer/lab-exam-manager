const { ObjectId } = require('mongodb');
const connection = require('./connection');


const create = async (array) => 
  connection()
    .then((db) => db.collection('exames').insertMany(array))
      .then((data) => data);

const getAll = async () =>
  connection().then((db) => db.collection('exames').find().toArray());

const updateById = async (id, obj) => {
  const { nome, tipo, laboratorio, status } = obj;

  return connection()
    .then((db) => db.collection('exames').updateOne({_id: ObjectId(id)}, {$set: {nome, tipo, laboratorio, status}}));
}

const getById = async (id) =>
  connection().then((db) => db.collection('exames').findOne(ObjectId(id)));


const deleteById = async (id) => 
  connection().then((db) => db.collection('exames').deleteOne({_id: (ObjectId(id))}));


module.exports = {
  create,
  getAll,
  updateById,
  getById,
  deleteById
};
