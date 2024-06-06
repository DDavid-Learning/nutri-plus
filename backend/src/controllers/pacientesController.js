const { response } = require("express")
const clienteModel = require('../models/pacientesModel')

const getAll = async (_req, res) => {
    const clientes = await clienteModel.getAll()
    return res.status(200).json(clientes)
}

const countPacientesAndConsultas = async (req, res) => {
    const totalPacientes = await clienteModel.countPacientesAndConsultas()
    return res.status(200).json(totalPacientes)
}

const createPaciente = async (req, res) => {
    const createdPaciente = await clienteModel.createPaciente(req.body);
    return res.status(201).json("Cadastrado com sucesso!")
}

module.exports ={
    getAll,
    countPacientesAndConsultas,
    createPaciente
}