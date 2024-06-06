const express = require("express");
const router = express.Router();
const clienteController = require('./controllers/pacientesController');
const pacientesMiddlewares = require('./middlewares/pacientesMiddlewares')

router.get('/pacientes', clienteController.getAll);
router.get('/dashboard', clienteController.countPacientesAndConsultas);    
router.post('/create/paciente', pacientesMiddlewares.validateBody, clienteController.createPaciente);    

module.exports = router; 

