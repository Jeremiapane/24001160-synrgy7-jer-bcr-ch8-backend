import { Knex } from "knex";
import bcrypt from "bcrypt";

const saltRounds = 10;
export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    const hashedPassword = await bcrypt.hash("12345", saltRounds);
    await knex("users").insert([{ id: 1, nama: "Jepan", email: "superadmin@gmail.com", password: hashedPassword, role: "superadmin", createdAt: new Date(), updatedAt: new Date() }]);
}
