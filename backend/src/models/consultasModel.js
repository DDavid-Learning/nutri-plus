const connection = require('./connection');

const getConsultas = async () => {
    const query = `
      SELECT 
        c.ID_consulta,
        p.nome AS nome_paciente,
        n.nome AS nome_nutricionista,
        c.data,
        c.tipo_pagamento
      FROM 
        consultas c
      JOIN 
        pacientes p ON c.ID_paciente = p.ID_paciente
      JOIN 
        nutricionistas n ON c.ID_nutricionista = n.ID_nutricionista
    `;
  
    try {
      const [consultas] = await connection.execute(query);
      console.log('Consultas:', consultas); // Adicione um log para verificar os dados retornados
      return consultas;
    } catch (error) {
      console.error('Erro ao executar a query:', error);
      throw error;
    }
  };
  


const cadastrarConsulta = async (dados) => {
    const { consulta, planoAlimentar, refeicoes, medidas } = dados;
    const conn = await connection.getConnection();
    
    try {
        await conn.beginTransaction();

        // Inserir a consulta
        const [consultaResult] = await conn.execute(
            'INSERT INTO consultas (ID_paciente, ID_nutricionista, data, tipo_pagamento) VALUES (?, ?, ?, ?)',
            [consulta.ID_paciente, consulta.ID_nutricionista, consulta.data, consulta.tipo_pagamento]
        );
        const consultaId = consultaResult.insertId;

        // Inserir o plano alimentar
        const [planoResult] = await conn.execute(
            'INSERT INTO plano_alimentar (ID_consulta, meta_calorica, objetivo) VALUES (?, ?, ?)',
            [consultaId, planoAlimentar.meta_calorica, planoAlimentar.objetivo]
        );
        const planoId = planoResult.insertId;

        // Inserir as refeições
        for (let refeicao of refeicoes) {
            await conn.execute(
                'INSERT INTO refeicoes (ID_plano_alimentar, alimento, dia_da_semana, horario) VALUES (?, ?, ?, ?)',
                [planoId, refeicao.alimento, refeicao.dia_da_semana, refeicao.horario]
            );
        }

        // Inserir as medidas
        await conn.execute(
            'INSERT INTO medidas (ID_consulta, biceps_esquerdo, biceps_direito, coxa_direito, coxa_esquerda, peitoral, cintura) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [consultaId, medidas.biceps_esquerdo, medidas.biceps_direito, medidas.coxa_direito, medidas.coxa_esquerda, medidas.peitoral, medidas.cintura]
        );

        await conn.commit();
        return { consultaId, planoId };
    } catch (error) {
        await conn.rollback();
        console.error('Erro ao cadastrar consulta completa:', error);
        throw error;
    } finally {
        conn.release();
    }
};



const getConsultasWithDetails = async (consultaId) => {
    const query = `
        SELECT 
            c.ID_consulta,
            c.ID_paciente,
            c.ID_nutricionista,
            c.data,
            c.tipo_pagamento,
            p.nome AS paciente_nome,
            p.idade AS paciente_idade,
            p.cpf AS paciente_cpf,
            m.biceps_esquerdo,
            m.biceps_direito,
            m.coxa_direito,
            m.coxa_esquerda,
            m.peitoral,
            m.cintura,
            pa.ID_plano_alimentar,
            pa.meta_calorica,
            pa.objetivo,
            r.ID_refeicao,
            r.alimento,
            r.dia_da_semana,
            r.horario
        FROM 
            consultas c
        LEFT JOIN 
            pacientes p ON c.ID_paciente = p.ID_paciente
        LEFT JOIN 
            medidas m ON c.ID_consulta = m.ID_consulta
        LEFT JOIN 
            plano_alimentar pa ON c.ID_consulta = pa.ID_consulta
        LEFT JOIN 
            refeicoes r ON pa.ID_plano_alimentar = r.ID_plano_alimentar
        WHERE 
            c.ID_consulta = ?;
    `;

    const [rows] = await connection.execute(query, [consultaId]);
    return rows;
};




module.exports = {
    getConsultas,
    cadastrarConsulta,
    getConsultasWithDetails
}