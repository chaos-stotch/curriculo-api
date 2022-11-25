const connection = require('./connection');

const getAll = async () => {
    const [curriculums] = await connection.execute("SELECT * FROM curriculum");
    return curriculums;
};

const getCurriculums = async (userId) => {
    const [curriculums] = await connection.execute(`SELECT * FROM curriculum WHERE userid=${userId}`);
    return curriculums;
};

const createCurriculum = async(curriculum) => {
    var category = curriculum.category
    if(category === undefined) {
        await connection.execute(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ("${curriculum.userId}", "${curriculum.title}", NULL, "${curriculum.dateyear}", "${curriculum.institution}", "${curriculum.localization}");`)
    }else{
        await connection.execute(`INSERT INTO curriculum (userid, title, category, dateyear, institution, localization) 
            VALUES ("${curriculum.userId}", "${curriculum.title}", "${category}", "${curriculum.dateyear}", "${curriculum.institution}", "${curriculum.localization}");`)
    }
};

module.exports = {
    getAll,
    getCurriculums,
    createCurriculum
};
