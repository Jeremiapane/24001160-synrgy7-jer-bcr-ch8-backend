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
};

module.exports = config;
