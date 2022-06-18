/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table) {
        table.integer('ip').unsigned().primary();
        table.integer('movieId').unsigned().references('id').inTable('movies').notNullable();
        table.boolean('liked').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('likes');
};
