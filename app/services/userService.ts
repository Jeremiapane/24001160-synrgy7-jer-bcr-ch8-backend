import { UserRepository } from "../repositories/userRepository";
import { UserModel } from "../models/userModels";

const userRepository = new UserRepository();

export const getUserById = async (id: number) => {
    return await userRepository.getUserById(id);
};
export const getUserByEmail = async (email: string, role: string) => {
    return await userRepository.getUserByEmail(email, role);
};
export const getAdminByEmail = async (email: string) => {
    return await userRepository.getAdminByEmail(email);
};
export const createAdmin = async (userData: Partial<UserModel>) => {
    return await userRepository.createAdmin(userData);
};
export const createMember = async (userData: Partial<UserModel>) => {
    return await userRepository.createMember(userData);
};
