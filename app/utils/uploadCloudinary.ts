import { Readable } from "stream";
import cloudinary from "./cloudinary.config";

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error) return reject(error);
            if (result?.secure_url) {
                resolve(result.secure_url);
            } else {
                reject(new Error("No secure_url returned from Cloudinary"));
            }
        });
        Readable.from(fileBuffer).pipe(uploadStream);
    });
};
