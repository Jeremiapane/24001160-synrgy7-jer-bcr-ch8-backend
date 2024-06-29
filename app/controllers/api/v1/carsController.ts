import { Request, Response } from "express";
import { uploadToCloudinary } from "../../../utils/uploadCloudinary";
import { createCars, getAllCars, getCarById, updateCar, deleteCar } from "../../../services/carService";
import { CarModel } from "../../../models/carModels";

export const getCars = async (req: Request, res: Response) => {
    try {
        const resp = await getAllCars();
        return res.status(200).json({
            message: "Data cars ditemukan",
            resp,
        });
    } catch (error) {
        return res.status(204).json({
            message: "Data car kosong",
        });
    }
};

export const getCarsById = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        const car = await getCarById(getId);
        return res.status(200).json({
            message: "Data mobil ditemukan",
            car,
        });
    } catch (error) {
        res.status(404).json({
            message: "Data cars not found",
        });
    }
};

export const handleCreate = async (req: Request, res: Response) => {
    const userData = req.user;
    const namaUser = userData?.nama;
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const { name, harga } = req.body;
        if (!name || !harga) {
            return res.status(400).json({ message: "Name and harga are required" });
        }
        const fileBuffer = req.file.buffer;
        const fotoUrl = await uploadToCloudinary(fileBuffer, "Challenge_Binar");
        const newCar = await createCars({
            name,
            harga: parseFloat(harga),
            foto: fotoUrl,
            startRent: new Date(),
            finishRent: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: namaUser,
            updatedBy: namaUser,
        });
        res.status(201).json({
            message: "Data mobil baru berhasil dibuat",
            car: newCar,
        });
    } catch (error) {
        res.status(500).json({
            message: "Data mobil baru gagal dibuat",
            error: (error as Error).message,
        });
    }
};

export const handleUpdate = async (req: Request, res: Response) => {
    const userData = req.user;
    const nama_user = userData?.nama;
    try {
        const id = +req.params.id;
        const { name, harga } = req.body;
        const updatedData: Partial<CarModel> = {
            name,
            harga: harga ? parseFloat(harga) : undefined,
            updatedAt: new Date(),
            updatedBy: nama_user,
        };
        if (req.file) {
            const fileBuffer = req.file.buffer;
            const fotoUrl = await uploadToCloudinary(fileBuffer, "Challenge_5");
            updatedData.foto = fotoUrl;
        }
        const updatedCar = await updateCar(id, updatedData);
        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ message: "Car updated successfully", car: updatedCar });
    } catch (error) {
        res.status(500).json({ message: "Failed to update car", error: (error as Error).message });
    }
};

export const handleDelete = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        await deleteCar(getId);
        return res.status(202).json({
            status: "OK",
            message: "Data cars berhasil dihapus",
        });
    } catch (error) {
        return res.status(400).json({
            status: "Bad",
            message: "Data cars gagal dihapus",
        });
    }
};
