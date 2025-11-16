import { Router } from "express";
import * as partiesController from "../controllers/parties.controller.js";

const router = Router()

app.get("/parties", partiesController.getParties);
router.get("/:id", partiesController.getPartyById);


export default router;