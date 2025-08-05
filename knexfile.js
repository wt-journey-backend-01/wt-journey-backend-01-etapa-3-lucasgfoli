require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const isCI = process.env.NODE_ENV === 'ci' || process.env.GITHUB_ACTIONS === 'true';

const baseConfig = {
  client: 'pg',
  connection: {
    host: isCI ? '127.0.0.1' : 'postgres',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

module.exports = {
  development: baseConfig,
  ci: baseConfig,
};
