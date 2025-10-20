import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.post("/login", controller.loginUser);

export default router;
