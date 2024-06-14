const express = require("express");
const router = express.Router();

const clienteController = require('./controllers/pacientesController');
const consultasController = require('./controllers/consultasController');
const planoAlimentarController = require('./controllers/planoAlimentarController');
const nutricionistasController = require('./controllers/nutricionistasController');

const pacientesMiddlewares = require('./middlewares/pacientesMiddlewares')
const consultasMiddlewares = require('./middlewares/consultasMiddlewares')
const nutricionistasMiddlewares = require('./middlewares/nutricionistasMiddlewares')
const authenticateToken = require('./middlewares/authMiddleware')


router.get('/planoalimentar', planoAlimentarController.getPlanoAlimentarWithRefeicoes);
router.get('/consultas/detalhes/:id', consultasController.getConsultasWithDetails);
router.get('/pacientes', clienteController.getAll);
router.get('/dashboard', clienteController.countPacientesAndConsultas);
router.get('/consultas', consultasController.getAllConsultas);



router.post('/create/paciente', pacientesMiddlewares.validateBody, clienteController.createPaciente);
router.post('/create/consulta', consultasMiddlewares.validarDadosConsulta, consultasController.createConsulta);
router.post('/create/nutricionista', nutricionistasMiddlewares.validarNutricionista, nutricionistasController.createNutricionista);
router.post('/login', nutricionistasController.loginNutricionista);

module.exports = router;

