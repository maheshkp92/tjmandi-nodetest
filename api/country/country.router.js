const router = require('express').Router();

const { check } = require('express-validator');

const {
    getCountry, 
    getCountryData 
} = require('./country.controller');

router.get('/countries', getCountry);

router.get('/country/id', [
    check('startYear').custom((value, { req }) => {
        if (value.length != 4) {
          throw new Error('Enter valid Start Year');
        }
        else if(value >= req.query.endYear) {
            throw new Error('Start Year should be less than End Year');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),
check('endYear').custom((value, { req }) => {
    if (value.length != 4) {
      throw new Error('Enter valid End Year');
    }
    else if(value <= req.query.startYear) {
        throw new Error('End Year should be greter than Start Year');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
check('category').not().isEmpty().withMessage("Category cannot be empty").trim()
.escape()], getCountryData);

module.exports = router;