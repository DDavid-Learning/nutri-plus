const connection = require('./connection');

const getAll = async () => {
    const query = `
        SELECT 
            p.ID_paciente,
            p.nome,
            p.idade,
            p.cpf,
            COUNT(c.ID_consulta) AS numero_de_consultas,
            MAX(c.data) AS data_ultima_consulta
        FROM 
            pacientes p
        LEFT JOIN 
            consultas c ON p.ID_paciente = c.ID_paciente
        GROUP BY 
            p.ID_paciente, p.nome, p.idade, p.cpf
    `;

    const [clientes] = await connection.execute(query);
    return clientes;
}

const countPacientesAndConsultas = async () => {
    const [pacientesResult] = await connection.execute('SELECT COUNT(*) AS totalPacientes FROM pacientes');
    const [consultasResult] = await connection.execute('SELECT COUNT(*) AS totalConsultas FROM consultas');

    return {
        totalPacientes: pacientesResult[0].totalPacientes,
        totalConsultas: consultasResult[0].totalConsultas
    };
}

const createPaciente = async (paciente) => {
    const { nome, idade, cpf } = paciente;
    const query = 'INSERT INTO pacientes(nome, idade, cpf) VALUES (?, ?, ?)';
    const [createdPaciente] = await connection.execute(query, [nome, idade, cpf])
    return createdPaciente;
}

const isCrnUnique = async (cpf) => {
    const query = 'SELECT COUNT(*) as count FROM pacientes WHERE cpf = ?';
    const [rows] = await connection.execute(query, [cpf]);
    return rows[0].count === 0;
};


module.exports = {
    getAll,
    countPacientesAndConsultas,
    createPaciente,
    isCrnUnique
}