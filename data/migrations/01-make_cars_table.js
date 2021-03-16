// DO YOUR MAGIC
exports.up = function (knex) {
    return knex.schema
    //run createTable method on schema object from knex to generate a table,
    .createTable('cars', table => {
        //each of the below is a column on the table object.

        table.increments('car_id');
        //sets car id to auto-increment
        table.text('vin').unique().notNullable();
        //sets unique string, required.
        table.text('make').notNullable();
        //sets make, required, not unique.
        table.text('model').notNullable();
        //sets model, required, not unique.
        table.integer("mileage").notNullable();
        table.text('title');
        table.text('transmission');      
    })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('cars')
}