const { Model } = require('objection');
const Knex = require('knex');
require('dotenv').config({ path: '.env' });

// Initialize knex.
const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: 'omdb'
    }
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = knex;