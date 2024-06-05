const { response } = require("express")
const clienteModel = require('../models/clientesModel')

const getAll = async (req, res) => {
    const clientes = await clienteModel.getAll()
    return res.status(200).json("teste")

}

module.exports ={
    getAll
}