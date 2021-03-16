// STRETCH
exports.seed = function (knex) {
    return knex('cars').truncate()
    .then(function () {
        return knex('cars').insert([
            {vin: "argybargyvin", make: "Mercedes", model: "C300", mileage: 10},
            {vin: "supefrcar", make: "Chariot", model: "OG", mileage: 0},
        ]);
    });
}