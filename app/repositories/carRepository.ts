import { CarModel } from "../models/carModels";

export class CarRepository {
    async getAllCars() {
        return await CarModel.query();
    }

    async getCarById(id: number) {
        return await CarModel.query().findById(id);
    }

    async createCar(carData: Partial<CarModel>) {
        return await CarModel.query().insert(carData);
    }

    async updateCar(id: number, carData: Partial<CarModel>) {
        return await CarModel.query().patchAndFetchById(id, carData);
    }

    async deleteCar(id: number) {
        return await CarModel.query().deleteById(id).throwIfNotFound();
    }
}
