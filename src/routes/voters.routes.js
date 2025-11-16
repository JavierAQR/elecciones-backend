import { Router } from "express";
import * as votersController from "../controllers/voters.controller"

const router = Router();

router.get("/:dni", votersController.getVoterByDni);

export default router;