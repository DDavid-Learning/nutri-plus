// middlewares/validateJsonMiddleware.js
const validarDadosConsulta = (req, res, next) => {
    const { consulta, planoAlimentar, refeicoes, medidas } = req.body;

    // Helper function to check if a value is empty
    const isEmpty = (value) => value === undefined || value === null || value === '';

    // Validação de consulta
    if (!consulta || 
        typeof consulta.ID_paciente !== 'number' || isEmpty(consulta.ID_paciente) ||
        typeof consulta.ID_nutricionista !== 'number' || isEmpty(consulta.ID_nutricionista) ||
        typeof consulta.data !== 'string' || isEmpty(consulta.data) ||
        typeof consulta.tipo_pagamento !== 'string' || isEmpty(consulta.tipo_pagamento)) {
        return res.status(400).json({ message: 'Dados de consulta inválidos ou campos vazios' });
    }

    // Validação de planoAlimentar
    if (!planoAlimentar || 
        typeof planoAlimentar.meta_calorica !== 'number' || isEmpty(planoAlimentar.meta_calorica) ||
        typeof planoAlimentar.objetivo !== 'string' || isEmpty(planoAlimentar.objetivo)) {
        return res.status(400).json({ message: 'Dados de plano alimentar inválidos ou campos vazios' });
    }

    // Validação de refeicoes
    if (!Array.isArray(refeicoes) || 
        refeicoes.some(refeicao => 
            typeof refeicao.alimento !== 'string' || isEmpty(refeicao.alimento) ||
            typeof refeicao.dia_da_semana !== 'string' || isEmpty(refeicao.dia_da_semana) ||
            typeof refeicao.horario !== 'string' || isEmpty(refeicao.horario))) {
        return res.status(400).json({ message: 'Dados de refeições inválidos ou campos vazios' });
    }

    // Validação de medidas
    if (!medidas || 
        typeof medidas.biceps_esquerdo !== 'number' || isEmpty(medidas.biceps_esquerdo) ||
        typeof medidas.biceps_direito !== 'number' || isEmpty(medidas.biceps_direito) ||
        typeof medidas.coxa_direito !== 'number' || isEmpty(medidas.coxa_direito) ||
        typeof medidas.coxa_esquerda !== 'number' || isEmpty(medidas.coxa_esquerda) ||
        typeof medidas.peitoral !== 'number' || isEmpty(medidas.peitoral) ||
        typeof medidas.cintura !== 'number' || isEmpty(medidas.cintura)) {
        return res.status(400).json({ message: 'Dados de medidas inválidos ou campos vazios' });
    }

    next();
}

module.exports = {
    validarDadosConsulta

};