OMDB App

Live version: http://143.110.226.4:25790/

This is the backend for an OMDB app that allows the creation of and modification of movies via a REST API.

Libraries used:
- axios (making HTTP requests)
- dotenv (loading .env variables in migrations)
- jest (for testing)
- knex (database ORM required by objection)
- objection (database ORM)

## Getting Started

Ensure you have postgres running.

Fill in a .env file with the following modifying accordingly:

```bash
host=localhost
port=5432
user=postgres
password=postgres
```

Install the required libraries with:

```bash
npm i
```

Add the required database migrations with

```bash
npx knex migrate:latest
```

Seed the database with

```bash
npx knex seed:run
```

Open the app with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.