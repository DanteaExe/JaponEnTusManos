import { Router } from "express";
import { SaleController } from "../controllers/SaleController";

const router = Router();
const controller = new SaleController();

router.get("/", controller.getSales);
router.get("/:id", controller.getSaleById);
router.post("/", controller.createSale);
router.get("/user/:userId", controller.getSalesByUser);


export default router;
