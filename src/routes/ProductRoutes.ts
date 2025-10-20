import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.post("/:id", controller.updateStock);

export default router;
