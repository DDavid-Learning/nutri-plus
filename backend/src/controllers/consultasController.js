const { response } = require("express")
const consultasModel = require('../models/consultasModel')

const getAllConsultas = async (_req, res) => {
    const [consultas] = await consultasModel.getConsultas()
    return res.status(200).json(consultas)
}

const createConsulta = async (req, res) => {
    try {
        const resultado = await consultasModel.cadastrarConsulta(req.body);
        res.status(201).json({
            message: 'Consulta cadastrada com sucesso',
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao cadastrar consulta',
            error: error.message
        });
    }
}



const getConsultasWithDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const consultaRows = await consultasModel.getConsultasWithDetails(id);

        if (consultaRows.length === 0) {
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }

        const consultas = consultaRows.reduce((acc, row) => {
            const {
                ID_consulta, ID_paciente, ID_nutricionista, data, tipo_pagamento,
                paciente_nome, paciente_idade, paciente_cpf,
                biceps_esquerdo, biceps_direito, coxa_direito, coxa_esquerda, peitoral, cintura,
                ID_plano_alimentar, meta_calorica, objetivo,
                ID_refeicao, alimento, dia_da_semana, horario
            } = row;

            if (!acc[ID_consulta]) {
                acc[ID_consulta] = {
                    ID_consulta,
                    ID_paciente,
                    ID_nutricionista,
                    data,
                    tipo_pagamento,
                    paciente: {
                        nome: paciente_nome,
                        idade: paciente_idade,
                        cpf: paciente_cpf,
                    },
                    medidas: {
                        biceps_esquerdo,
                        biceps_direito,
                        coxa_direito,
                        coxa_esquerda,
                        peitoral,
                        cintura
                    },
                    plano_alimentar: ID_plano_alimentar ? {
                        ID_plano_alimentar,
                        meta_calorica,
                        objetivo,
                        refeicoes: []
                    } : null
                };
            }

            if (ID_refeicao && acc[ID_consulta].plano_alimentar) {
                acc[ID_consulta].plano_alimentar.refeicoes.push({ ID_refeicao, alimento, dia_da_semana, horario });
            }

            return acc;
        }, {});

        return res.status(200).json(Object.values(consultas)[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar consultas com detalhes.' });
    }
};



module.exports = {
    getAllConsultas,
    createConsulta,
    getConsultasWithDetails
}