import { Model, ModelObject } from "objection";

export class UserModel extends Model {
    id!: number;
    nama!: string;
    email!: string;
    password!: string;
    role!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return "users";
    }
}
export type Cars = ModelObject<UserModel>;
