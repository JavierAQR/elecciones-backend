import { Router } from "express";
import * as guidesController from "../controllers/guides.controller"

const router = Router()

router.get("/:role", guidesController.getGuidesByRole);

export default router;