const express = require("express");
const router = express.Router();
const clienteController = require('./controllers/clienteController');

router.get('/clientes', clienteController.getAll);  



module.exports = router; 

