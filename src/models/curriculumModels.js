const config = require('./connection');
const pg = require('pg')

const getAll = async () => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query("SELECT * FROM curriculum");
    const curriculums = db_data.rows;
    await connection.end();
    return curriculums;
};

const getCurriculums = async (userId) => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM curriculum WHERE userid=${userId}`);
    const curriculums = await db_data.rows;
    await connection.end();
    return curriculums;
};

const createCurriculum = async(curriculum) => {
    var category = curriculum.category
    const connection = new pg.Client(config);
    await connection.connect();
    if(category === undefined) {
        await connection.query(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ('${curriculum.userId}', '${curriculum.title}', NULL, '${curriculum.dateyear}', '${curriculum.institution}', '${curriculum.localization}');`)
    }else{
        await connection.query(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ('${curriculum.userId}', '${curriculum.title}', '${category}', '${curriculum.dateyear}', '${curriculum.institution}', '${curriculum.localization}');`)
    }
    connection.end()
};

module.exports = {
    getAll,
    getCurriculums,
    createCurriculum
};
