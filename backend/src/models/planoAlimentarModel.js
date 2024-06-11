const connection = require('./connection');

const getPlanoAlimentarWithRefeicoes = async () => {
    const query = `
    SELECT 
        pa.ID_plano_alimentar,
        pa.ID_consulta,
        pa.meta_calorica,
        pa.objetivo,
        r.ID_refeicao,
        r.alimento,
        r.dia_da_semana,
        r.horario
    FROM 
        plano_alimentar pa
    LEFT JOIN 
        refeicoes r ON pa.ID_plano_alimentar = r.ID_plano_alimentar;
`;

    const [result] = await connection.execute(query);
    return result;
}

module.exports = {
    getPlanoAlimentarWithRefeicoes,
}
