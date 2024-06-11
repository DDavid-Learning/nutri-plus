const nutricionistasModel = require('../models/nutricionistasModel');

const validarNutricionista = async (req, res, next) => {
    const { nome, idade, senha, crn } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    }

    if (idade === undefined || idade === null) {
        return res.status(400).json({ message: 'O campo "idade" é obrigatório.' });
    }

    if (!senha) {
        return res.status(400).json({ message: 'O campo "senha" é obrigatório.' });
    }

    if (!crn) {
        return res.status(400).json({ message: 'O campo "crn" é obrigatório.' });
    }

    try {
        const isUnique = await nutricionistasModel.isCrnUnique(crn);
        if (!isUnique) {
            return res.status(400).json({ message: 'O CRN fornecido já está cadastrado.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao validar CRN', error: error.message });
    }
}


const validarNutricionistaLogin = async (req, res, next) => {
    const { senha, crn } = req.body;

    if (!crn) {
        return res.status(400).json({ message: 'O campo "crn" é obrigatório.' });
    }

    if (!senha) {
        return res.status(400).json({ message: 'O campo "senha" é obrigatório.' });
    }

    next();
}

module.exports = {
    validarNutricionista,
    validarNutricionistaLogin
}
