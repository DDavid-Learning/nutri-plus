const connection =  require('./connection');

const getAll = async () => {
    const clientes = await connection.execute('SELECT * FROM clientes');
    return clientes;
}

module.exports = {
    getAll
}