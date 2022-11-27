const fs = require("fs");
var path = require('path');

const findLocation = async(city, state, country) => {
    var finded_city = "NULL"
    var finded_state = "NULL"
    var finded_country = "NULL"

    return new Promise(function (resolve, reject) {fs.readFile(path.join(__dirname, 'cities.json'), function(err, data) {
        if (err) throw err;

        const cities = JSON.parse(data);

        for(let c = 0; c < cities.length; c++)
            if(city != ""){
                if(cities[c].name.toLowerCase() == city.toLowerCase()) {
                    if(cities[c].state_name.toLowerCase() == state.toLowerCase() || cities[c].state_code == state.toUpperCase()) {
                        if(cities[c].country_name.toLowerCase() == country.toLowerCase() || cities[c].country_code == country.toUpperCase()) {
                            finded_city = cities[c].name
                            finded_state = cities[c].state_name
                            finded_country = cities[c].country_name
                            c = cities.length
                        };
                    };
                };
            }else if(state != "") {
                if(cities[c].state_name.toLowerCase() == state.toLowerCase() || cities[c].state_code == state.toUpperCase()) {
                    if(cities[c].country_name.toLowerCase() == country.toLowerCase() || cities[c].country_code == country.toUpperCase()){
                        finded_state = cities[c].state_name
                        finded_country = cities[c].country_name
                        c = cities.length
                    };
                };
            }else if(country != "") {
                if(cities[c].country_name.toLowerCase() == country.toLowerCase() || cities[c].country_code == country.toUpperCase()){
                    finded_country = cities[c].country_name
                    c = cities.length
                };
            }
        const findedLocation = {
            "city": finded_city,
            "state": finded_state,
            "country": finded_country
        }
        resolve(findedLocation)
    });
})}

module.exports = findLocation