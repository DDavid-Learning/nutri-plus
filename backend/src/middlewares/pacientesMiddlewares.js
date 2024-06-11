const pacientesModel = require('../models/pacientesModel');

const isCPFValid = (cpf) => {
    // Remove qualquer coisa que não seja dígito
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
}

const validateBody = async (req, res, next) => {
    const { nome, idade, cpf } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    }

    if (idade === undefined || idade === null) {
        return res.status(400).json({ message: 'O campo "idade" é obrigatório.' });
    }

    if (!cpf) {
        return res.status(400).json({ message: 'O campo "CPF" é obrigatório.' });
    }

    if (!isCPFValid(cpf)) {
        return res.status(400).json({ message: 'O CPF fornecido é inválido.' });
    }

    try {
        const isUnique = await pacientesModel.isCrnUnique(cpf);
        if (!isUnique) {
            return res.status(400).json({ message: 'O CPF fornecido já está cadastrado.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao validar CPF', error: error.message });
    }

    
}

module.exports = {
    validateBody,
}
