import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";

const router = Router();

router.get("/", eventController.getEvents);

router.get("/next", eventController.getNextEvent);

export default router;
