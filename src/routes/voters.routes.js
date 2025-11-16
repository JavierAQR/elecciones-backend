import { Router } from "express";
import * as votersController from "../controllers/voters.controller.js"

const router = Router();

router.get("/:dni", votersController.getVoterByDni);

export default router;