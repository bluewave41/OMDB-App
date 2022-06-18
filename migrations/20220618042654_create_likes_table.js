/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table) {
        table.integer('ip').unsigned();
        table.integer('movieId').unsigned().references('id').inTable('movies').onDelete('cascade').notNullable();
        table.boolean('liked').notNullable();

        table.primary(['ip', 'movieId']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('likes');
};
