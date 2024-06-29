import { Router } from "express";
import { buatAdmin, cekUser, handleGoogle, loginAdmin, loginUser, register } from "../app/controllers/api/v1/authController";
import { checkSuperAdmin, whoAmI } from "../app/middlewares/auth";

const router = Router();
router.post("/admin/login", loginAdmin);
router.get("/currentUser", whoAmI, cekUser);
router.post("/member/login", loginUser);
router.post("/member/register", register);
router.post("/superAdmin/createAdmin", checkSuperAdmin, buatAdmin);
router.post("/login/google", handleGoogle);

export default router;
