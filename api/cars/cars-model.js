const db = require("../../data/db-config");

const getAll = () => {
  return db('cars');
  //knex syntax, returns a promise; 
  //this is equivalent to db.select('*').from('users');
}

const getById = (id) => {
  return db('cars').where('car_id', id).first();
  //return first result where car id matches;
}

const create = async (car) => {
  // db('cars').insert(car);
  //can I pass a whole object like this? Does it know to destructure?

  const trimmed = {...car, make: car.make.trim(), model: car.model.trim()};
  const newCar = await db('cars').insert(trimmed);
  return await getById(newCar);


};

module.exports = {getAll, getById, create};