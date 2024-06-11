const planoAlimentarModel = require('../models/planoAlimentarModel');

const getPlanoAlimentarWithRefeicoes = async (_req, res) => {
    try {
        const planoAlimentarRows = await planoAlimentarModel.getPlanoAlimentarWithRefeicoes();

        const planosAlimentares = planoAlimentarRows.reduce((acc, row) => {
            const { ID_plano_alimentar, ID_consulta, meta_calorica, objetivo, ID_refeicao, alimento, dia_da_semana, horario } = row;

            if (!acc[ID_plano_alimentar]) {
                acc[ID_plano_alimentar] = {
                    ID_plano_alimentar,
                    ID_consulta,
                    meta_calorica,
                    objetivo,
                    refeicoes: []
                };
            }

            if (ID_refeicao) {
                acc[ID_plano_alimentar].refeicoes.push({ ID_refeicao, alimento, dia_da_semana, horario });
            }

            return acc;
        }, {});

        return res.status(200).json(Object.values(planosAlimentares));
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar plano alimentar com refeições.' });
    }
}

module.exports = {
    getPlanoAlimentarWithRefeicoes,
}
