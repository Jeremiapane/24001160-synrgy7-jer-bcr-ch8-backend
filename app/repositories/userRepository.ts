import { UserModel } from "../models/userModels";

export class UserRepository {
    async getUserById(id: number) {
        return await UserModel.query().where("id", id).first();
    }
    async getUserByEmail(email: string, role: string) {
        return await UserModel.query().where("email", email).andWhere("role", role).first();
    }

    async getAdminByEmail(email: string) {
        try {
            const user = await UserModel.query()
                .where("email", email)
                .andWhere(function () {
                    this.where("role", "superadmin").orWhere("role", "admin");
                })
                .first();

            return user;
        } catch (error) {
            console.error("Error fetching admin by email:", error);
            throw error;
        }
    }

    async createAdmin(userData: Partial<UserModel>) {
        return await UserModel.query().insert(userData);
    }
    async createMember(userData: Partial<UserModel>) {
        return await UserModel.query().insert(userData);
    }
}
