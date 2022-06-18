const knex = require('lib/Database');

global.beforeEach(async () => {
	await knex('movies').delete();
	await knex('likes').delete();
})

global.afterAll(async () => {
    await knex.destroy();
})