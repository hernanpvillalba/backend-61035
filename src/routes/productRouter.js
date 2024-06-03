import { Router } from "express";
import * as controller from "../controllers/productControllers.js"

const router = Router();

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.get("/", controller.create)
router.get("/:id", controller.update)
router.get("/:id", controller.remove)

export default router;