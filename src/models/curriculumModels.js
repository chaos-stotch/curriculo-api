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

const getCurriculums = async (userid) => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM curriculum WHERE userid='${userid}'`);
    const curriculums = db_data.rows;
    await connection.end();
    return curriculums;
};

const createCurriculum = async(curriculum) => {
    var category = curriculum.category.toLowerCase()
    const connection = new pg.Client(config);
    await connection.connect();
    if(category === undefined) {
        await connection.query(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ('${curriculum.userId}', '${curriculum.title}', NULL, '${curriculum.dateYear}', '${curriculum.institution}', '${curriculum.localization}');`)
    }else{
        await connection.query(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ('${curriculum.userId}', 
            '${curriculum.title}', 
            '${category}', 
            '${curriculum.dateYear}', 
            '${curriculum.institution}', 
            '{"${curriculum.localization.country}", "${curriculum.localization.state}", "${curriculum.localization.city}"}');`)
    }
    connection.end()
};

const deleteCurriculum = async(id) => {
    const connection = new pg.Client(config);
    await connection.connect();
    await connection.query(`DELETE FROM curriculum WHERE id = ${id}`)
    connection.end()
}

const updateCurriculum = async(curriculum) => {
    const connection = new pg.Client(config);
    await connection.connect();
    if(curriculum.title !== undefined) {
        await connection.query(`UPDATE curriculum
            SET title = '${curriculum.title}'
            WHERE id = '${curriculum.id}'`)
    }
    if(curriculum.dateYear !== undefined) {
        await connection.query(`UPDATE curriculum
            SET dateyear = '${curriculum.dateYear}'
            WHERE id = '${curriculum.id}'`)
    }
    if(curriculum.category !== undefined) {
        await connection.query(`UPDATE curriculum
            SET category = '${curriculum.category.toLowerCase()}'
            WHERE id = '${curriculum.id}'`)
    }
    if(curriculum.institution !== undefined) {
        await connection.query(`UPDATE curriculum
            SET institution = '${curriculum.institution}'
            WHERE id = '${curriculum.id}'`)
    }
    if(curriculum.localization !== undefined) {
        await connection.query(`UPDATE curriculum
            SET localization = '{"${curriculum.localization.country}", "${curriculum.localization.state}", "${curriculum.localization.city}"}'
            WHERE id = '${curriculum.id}'`)
    }
    await connection.end();
}

module.exports = {
    getAll,
    getCurriculums,
    createCurriculum,
    deleteCurriculum,
    updateCurriculum
};
