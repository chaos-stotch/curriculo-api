const connection = require('./connection');

const getAll = async () => {
    const [curriculums] = await connection.execute("SELECT * FROM curriculum");
    return curriculums;
};

module.exports = {
    getAll
};
