import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "yangsuperadminaja";

interface JwtPayload {
    id: string;
    nama: string;
    email: string;
    role: string;
}

export const whoAmI = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Harap login terlebih dahulu" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = {
            id: decoded.id,
            nama: decoded.nama,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token JWT tidak valid" });
    }
};

export const checkAkses = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Harap login terlebih dahulu sebagai superadmin atau admin" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        if (decoded.role !== "superadmin" && decoded.role !== "admin") {
            return res.status(403).json({ message: "Hanya superadmin dan yang bisa buat data car baru." });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "JWT token expired" });
    }
};

export const checkSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Harap login terlebih dahulu sebagai superadmin" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        if (decoded.role !== "superadmin") {
            return res.status(403).json({ message: "Hanya superadmin yang bisa buat data admin baru." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "JWT token expired" });
    }
};
