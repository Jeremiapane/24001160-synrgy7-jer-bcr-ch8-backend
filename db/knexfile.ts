import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            port: Number(process.env.PG_PORT),
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
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

    production: {
        client: "postgresql",
        connection: {
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
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
