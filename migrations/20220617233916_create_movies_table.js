/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    //• Each movie supports title, description, release year, duration, rating
    return knex.schema.createTable('movies', function(table) {
        table.increments('id');
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.integer('releaseYear').notNullable();
        table.smallint('duration').notNullable();
        table.float('rating').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('movies');
};
