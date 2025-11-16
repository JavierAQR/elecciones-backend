import { Router } from "express";

const router = Router();

router.get("/:dni", getVoterByDni);

export default router;