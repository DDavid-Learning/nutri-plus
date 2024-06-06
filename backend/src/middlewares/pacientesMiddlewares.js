const validateBody = (req, res, next) => {
    const { nome, idade, CPF } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    }

    if (idade === undefined || idade === null) {
        return res.status(400).json({ message: 'O campo "idade" é obrigatório.' });
    }

    if (!CPF) {
        return res.status(400).json({ message: 'O campo "CPF" é obrigatório.' });
    }

    next();

}

module.exports = {
    validateBody,
}