import { createAdmin, createMember, getAdminByEmail, getUserByEmail } from "../../../services/userService";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

const saltRounds = 10;
const SECRET_KEY = "yangsuperadminaja";
interface UserPayload {
    id: number;
    nama: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
declare module "express" {
    interface Request {
        user?: JwtPayload;
    }
}

export const cekUser = (req: Request, res: Response) => {
    const userData = req.user;
    res.json({ userData });
};

const checkPassword = (hashedPassword: string, password: string | Buffer): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isPasswordCorrect) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(isPasswordCorrect);
        });
    });
};

const createToken = (payload: UserPayload): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Token expires in 1 hour
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const role = "member";

    try {
        const user = await getUserByEmail(email, role);
        if (!user) {
            return res.status(404).json({ message: "akun tidak ditemukan" });
        }
        const isPasswordCorrect = await checkPassword(user.password, password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password salah!" });
        }
        const token = createToken({
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
        return res.status(200).json({
            id: user.id,
            nama: user.nama,
            email: user.email,
            token,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getAdminByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "akun tidak ditemukan" });
        }
        const isPasswordCorrect = await checkPassword(user.password, password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password salah!" });
        }
        const token = createToken({
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
        return res.status(200).json({
            id: user.id,
            nama: user.nama,
            email: user.email,
            token,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(hashedPassword);
        });
    });
};

export const buatAdmin = async (req: Request, res: Response) => {
    const { nama, email, password } = req.body;
    const role = "admin";

    try {
        const hashedPassword = await hashPassword(password);
        const newAdmin = await createAdmin({ nama, email, password: hashedPassword, role, created_at: new Date(), updated_at: new Date() });
        return res.status(201).json({ message: "Admin user created successfully", user: newAdmin });
    } catch (error) {
        console.error("Error creating admin user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const register = async (req: Request, res: Response) => {
    const { nama, email, password } = req.body;
    const role = "member";

    try {
        const hashedPassword = await hashPassword(password);
        const newMember = await createMember({ nama, email, password: hashedPassword, role, created_at: new Date(), updated_at: new Date() });
        return res.status(201).json({ message: "User created successfully", user: newMember });
    } catch (error) {
        console.error("Error creating member user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handleGoogle = async (req: Request, res: Response) => {
    const role = "member";
    const { name: nama, email, jti } = req.body.payload;

    try {
        let user = await getUserByEmail(email.toLowerCase(), role);
        if (!user) {
            const hashedPassword = await hashPassword(jti);
            user = await createMember({ nama, email: email.toLowerCase(), password: hashedPassword, role, created_at: new Date(), updated_at: new Date() });
        }
        const token = createToken({
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
        return res.status(200).json({
            id: user.id,
            nama: user.nama,
            email: user.email,
            token,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        console.error("Error handling Google user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
