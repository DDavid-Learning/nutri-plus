const connection = require('./connection');

const getAll = async () => {
    const [clientes] = await connection.execute('SELECT * FROM pacientes');
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


module.exports = {
    getAll,
    countPacientesAndConsultas,
    createPaciente
}