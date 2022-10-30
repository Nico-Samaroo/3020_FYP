const express = require ('express');

const {
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const app = express.Router();

app
  .post('/', createData)
  .get('/', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = app;