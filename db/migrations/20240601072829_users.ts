import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("nama", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("role", 20).notNullable();
        table.timestamp("createdAt").notNullable();
        table.timestamp("updatedAt").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}
