import express from "express";
import { AdminController } from "../controllers/AdminController";

const router = express.Router();
const controller = new AdminController();

router.post("/", controller.createAdmin);
router.post("/login", controller.loginAdmin);
router.get("/", controller.getAdmins);

export default router;
