import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const validateFileType = (allowedMimeTypes: string[]) => {
    return (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const err = new Error(`Only accepted file with type ${allowedMimeTypes.join(", ")}`);
            cb(err);
        }
    };
};

export const Upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: validateFileType(["image/bmp", "image/jpeg", "image/png", "image/gif"]),
    limits: { fileSize: 2000000 },
});
