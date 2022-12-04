const config = require('./connection');
const pg = require('pg')

const getAll = async () => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query("SELECT * FROM curriculum");
    const curriculums = db_data.rows;
    await connection.end();
    const organizedCurriculums = await organizeGetAll(curriculums);
    return organizedCurriculums;
};

const getCurriculums = async(userid) => {
    const connection = new pg.Client(config);
    await connection.connect();
    const db_data = await connection.query(`SELECT * FROM curriculum WHERE userid='${userid}'`);
    const curriculums = db_data.rows;
    await connection.end();
    console.log(curriculums);
    const responseCurriculum = await organizeByCategorie(curriculums);
    return responseCurriculum;
};

const organizeGetAll = async(curriculums) => {
    var allUsers = [];
    for(let c=0; c<curriculums.length; c++) {
        let userid = curriculums[c]["userid"];

        if(!(allUsers.some(e => e.userid == userid))) {
            allUsers.push({"userid": userid, "data": []});
        }
    }
    for(let c=0; c<curriculums.length; c++) {
        let userid = curriculums[c]["userid"];
        for(let x=0; x<allUsers.length; x++) {
            let useridCheck = allUsers[x]["userid"];
            if(useridCheck == userid) {
                allUsers[x].data.push(curriculums[c]);
            }
        }
    }
    let organizedCurriculums = [];
    for(let c=0; c<allUsers.length; c++) {
        let organizedCurriculum = await organizeByCategorie(allUsers[c].data);
        organizedCurriculums.push({"userid": allUsers[c].userid, "registers": organizedCurriculum});
    };
    return organizedCurriculums;
}

const organizeByCategorie = async(curriculums) => {
    ['individual', 'coletiva', 'especial', 'publica', 'premios', 'residenciais']
    var curriculumsResponse = {};
    var individual = [];
    var coletiva = [];
    var especial = [];
    var publica = [];
    var premios = [];
    var residenciais = [];
    for(let c=0; c<curriculums.length; c++){
        var curriculum = curriculums[c]
        if(curriculum.category === "individual") {
            individual.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
        if(curriculum.category === "coletiva") {
            coletiva.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
        if(curriculum.category === "especial") {
            especial.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
        if(curriculum.category === "publica") {
            publica.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
        if(curriculum.category === "premios") {
            premios.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
        if(curriculum.category === "residenciais") {
            residenciais.push({
                "id": curriculum.id,
                "title": curriculum.title,
                "dateyear": curriculum.dateyear,
                "institution": curriculum.institution,
                "localization": curriculum.localization
            })
        };
    }
    if(individual.length != 0) {
        curriculumsResponse.individual = individual
    }
    if(coletiva.length != 0) {
        curriculumsResponse.coletiva = coletiva
    }
    if(especial.length != 0) {
        curriculumsResponse.especial = especial
    }
    if(publica.length != 0) {
        curriculumsResponse.publica = publica
    }
    if(premios.length != 0) {
        curriculumsResponse.premios = premios
    }
    if(residenciais.length != 0) {
        curriculumsResponse.residenciais = residenciais
    }
    return curriculumsResponse;
}

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
