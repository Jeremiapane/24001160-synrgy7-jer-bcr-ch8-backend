import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.integer("harga", 20).notNullable();
        table.text("foto").notNullable();
        table.date("startRent").notNullable();
        table.date("finishRent").notNullable();
        table.timestamp("createdAt").notNullable();
        table.timestamp("updatedAt").notNullable();
        table.string("createdBy", 255).notNullable();
        table.string("updatedBy", 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}
