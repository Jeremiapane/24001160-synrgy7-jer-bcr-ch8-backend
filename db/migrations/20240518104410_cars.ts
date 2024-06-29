import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.integer("harga", 20).notNullable();
        table.text("foto").notNullable();
        table.date("start_rent").notNullable();
        table.date("finish_rent").notNullable();
        table.timestamp("created_at").notNullable();
        table.timestamp("updated_at").notNullable();
        table.string("created_by", 255).notNullable();
        table.string("updated_by", 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}
