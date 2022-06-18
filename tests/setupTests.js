const knex = require('lib/Database');

global.beforeEach(async () => {
	await knex('movies').delete();
	await knex('likes').delete();
})