const connection = require('./connection');


const createNutricionista = async (nome, idade, senha, crn) => {
    const query = 'INSERT INTO nutricionistas (nome, idade, senha, crn) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [nome, idade, senha, crn]);
    return result.insertId;
}

const isCrnUnique = async (crn) => {
    const query = 'SELECT COUNT(*) as count FROM nutricionistas WHERE crn = ?';
    const [rows] = await connection.execute(query, [crn]);
    return rows[0].count === 0;
};

const getNutricionistaById = async (id) => {
    const query = 'SELECT ID_nutricionista, nome, idade, crn FROM nutricionistas WHERE ID_nutricionista = ?';
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
}

const getNutricionistaByCrn = async (crn) => {
    const query = 'SELECT ID_nutricionista, nome, idade, senha, crn FROM nutricionistas WHERE crn = ?';
    const [rows] = await connection.execute(query, [crn]);
    return rows[0];
}


module.exports = {
    createNutricionista,
    getNutricionistaById,
    getNutricionistaByCrn,
    isCrnUnique
}
