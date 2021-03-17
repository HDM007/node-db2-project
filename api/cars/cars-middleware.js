const Cars = require("./cars-model.js");
const db = require('../../data/db-config');
var vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (!car) {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;

  if(!vin || !make || !model || !mileage){
    res.status(400).json({message: "Either vin, make, model, or mileage is missing. Please check your request body for missing entries."})
  } else {
    next();
  }
}
//need to check VIN validator in Slack for this one.
const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validVin = vinValidator.validate(req.body.vin);

  if (validVin === false) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;

  const matchExists = await db('cars')
  .where('vin', req.body.vin.trim());

  if(matchExists){
    res.status(400).json({message: `the vin: ${vin} already exists.`})
  } else {
    next()
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique

}