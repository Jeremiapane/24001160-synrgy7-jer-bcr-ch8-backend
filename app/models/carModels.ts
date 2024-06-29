import { Model, ModelObject } from "objection";

export class CarModel extends Model {
    id!: number;
    name!: string;
    harga!: number;
    foto!: string;
    startRent!: Date;
    finishRent!: Date;
    createdAt!: Date;
    updatedAt!: Date;
    createdBy!: string;
    updatedBy!: string;

    static get tableName() {
        return "cars";
    }
}
export type Cars = ModelObject<CarModel>;
