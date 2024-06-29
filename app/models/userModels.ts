import { Model, ModelObject } from "objection";

export class UserModel extends Model {
    id!: number;
    nama!: string;
    email!: string;
    password!: string;
    role!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "users";
    }
}
export type Cars = ModelObject<UserModel>;
