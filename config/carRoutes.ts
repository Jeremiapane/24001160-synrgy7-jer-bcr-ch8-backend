import { Router } from "express";
import { handleCreate, handleDelete, handleUpdate, getCarsById, getCars } from "../app/controllers/api/v1/carsController";
import { Upload } from "../app/middlewares/multer";
import { checkAkses, whoAmI } from "../app/middlewares/auth";
const router = Router();

//  Cars Routes
router.get("/", getCars);
router.get("/:id", getCarsById);
router.post("/create", checkAkses, whoAmI, Upload.single("foto"), handleCreate);
router.put("/edit/:id", checkAkses, whoAmI, Upload.single("foto"), handleUpdate);
router.delete("/delete/:id", checkAkses, handleDelete);

export default router;
