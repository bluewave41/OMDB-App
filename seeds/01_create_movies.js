/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('movies').del()
    await knex('movies').insert([
        {
            id: 1,
            title: 'Hello World',
            description: 'A riveting tale of a young programmer on their quest to become the very best.',
            releaseYear: 2022,
            duration: 136,
            rating: 9.7
        },
        {
            id: 2,
            title: 'Hello There',
            description: 'After landing their dream job will this young programmer succeed in their new role?',
            releaseYear: 2022,
            duration: 114,
            rating: 5.3
        },
        {
            id: 3,
            title: 'The SQL mystery',
            description: `Who killed Mrs. Soap? When the only clue left behind is a note reading "SQL" it's up to the young programmer to investigate.`,
            releaseYear: 2024,
            duration: 160,
            rating: 8.0
        },
        {
            id: 4,
            title: 'To C or not to C',
            description: 'The thrilling conclusion to the classic hit "To B or not to B"',
            releaseYear: 2015,
            duration: 111,
            rating: 3.4
        },
        {
            id: 5,
            title: 'The Hot Coffee Incident',
            description: "What do you get when you combine hot coffee with a PC?",
            releaseYear: 2013,
            duration: 128,
            rating: 9.9
        },
    ]);
};