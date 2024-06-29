import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("cars").del();
    await knex("cars").insert([
        {
            name: "Toyota Innova",
            harga: 750_000,
            foto: "https://res.cloudinary.com/dcyojno0c/image/upload/v1717311051/Challenge_Binar/2022_Toyota_Kijang_Innova_2.4_G_GUN142R__2820220302_29_ery9sa.jpg",
            start_rent: new Date(),
            finish_rent: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            created_by: "Jepan",
            updated_by: "Jepan",
        },
    ]);
}
