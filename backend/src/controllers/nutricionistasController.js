const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const nutricionistasModel = require('../models/nutricionistasModel');

const createNutricionista = async (req, res) => {
    const { nome, idade, senha, crn } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const nutricionistaId = await nutricionistasModel.createNutricionista(nome, idade, hashedPassword, crn);
        
        const nutricionista = await nutricionistasModel.getNutricionistaById(nutricionistaId);
        const token = jwt.sign({ id: nutricionista.ID_nutricionista }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(201).json({ token, nutricionista });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao registrar nutricionista', error });
    }
}

const loginNutricionista = async (req, res) => {
    const { crn, senha } = req.body;

        const nutricionista = await nutricionistasModel.getNutricionistaByCrn(crn);

        if (!nutricionista) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isPasswordValid = await bcrypt.compare(senha, nutricionista.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: nutricionista.ID_nutricionista }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({ token });
    
}



module.exports = {
    createNutricionista,
    loginNutricionista
}
