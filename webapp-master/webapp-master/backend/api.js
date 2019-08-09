const express = require('express');
const api = express.Router();

api.get('/', (req, res, next) => {
  res.status(200).send('Hello from Express!');
});

module.exports = api;
