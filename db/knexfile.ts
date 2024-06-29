import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            database: "binar_challenge_5",
            user: "jepan",
            password: "12345",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "binar_challenge_5",
            user: "jepan",
            password: "101112",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./seeds",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: process.env.PG_DATABASE,
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            port: Number(process.env.PG_PORT),
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./seeds",
        },
    },
};

module.exports = config;
