import { CarRepository } from "../repositories/carRepository";
import { CarModel } from "../models/carModels";

const carRepository = new CarRepository();

export const getAllCars = async () => {
    return await carRepository.getAllCars();
};

export const getCarById = async (id: number) => {
    return await carRepository.getCarById(id);
};

export const createCars = async (carData: Partial<CarModel>) => {
    return await carRepository.createCar(carData);
};

export const updateCar = async (id: number, carData: Partial<CarModel>) => {
    return await carRepository.updateCar(id, carData);
};

export const deleteCar = async (id: number) => {
    return await carRepository.deleteCar(id);
};
