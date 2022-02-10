
const con = require('../../db/db');

module.exports = {
    // Get Country List
    getCountryList: (callback) => {
        con.query(
            `select id, country, min(year) as startYear, max(year) as endYear
            from ghd group by country`,
        (error, results) => {
            if (error) {
                return callback(error);
            }
        return callback(null, results);
        },
        )
    },
    // Get Country List
    getCountryDetails: (syear, eyear, cat, callback) => {
        
        let myArray = cat.toLowerCase().split("and");
        
        let cond = "";
        myArray.forEach(function (item, index) {
            cond += "category LIKE '%"+item+"%' AND ";
        });
        
        let n = cond.lastIndexOf("AND");
        cond = cond.slice(0, n) + cond.slice(n).replace("AND", "");
                
        let q = `select * from ghd where year BETWEEN ${syear} AND ${eyear} and ${cond}`;
        
        con.query(q, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
}