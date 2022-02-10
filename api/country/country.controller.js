const { validationResult } = require('express-validator');
const { getCountryList, getCountryDetails } = require('./country.service');

module.exports = {
  getCountry: (request, response) => {
    getCountryList((error, results) => {
        if (error) {
          console.log(error);
          return response.status(500).json({
            success: 0,
            message: 'Database connection error',
            error_code: 500,
          });
        }
        if (results.length === 0) {
          return response.json({
            success: 0,
            message: 'Country Data Not Found.',
            error_code: 404,
          });
        }
        const responseRes = {
          success: 1,
          message: 'Data Retrieved Successfully',
          data: results,
        };
        
        return response.json(responseRes);
    });
  },
  getCountryData: (request, response) => {
    // Check Validaion error If any.
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    const startYear = request.query.startYear;
    const endYear = request.query.endYear;
    const category = request.query.category;

    getCountryDetails(startYear, endYear, category, (error, results) => {
        if (error) {
          console.log(error);
          return response.status(500).json({
            success: 0,
            message: 'Database connection error',
            error_code: 500,
          });
        }
        if (results.length === 0) {
          return response.json({
            success: 0,
            message: 'No data found.',
          });
        }
        
        const responseRes = {
          success: 1,
          message: 'Data Retrieved Successfully',
          data: results,
        };
        return response.json(responseRes);
    });
  }
}