import express from "express";
import eventRoutes from "./routes/event.routes.js";
import partiesRoutes from "./routes/parties.routes.js"
import guidesRoutes from "./routes/guides.routes.js"
import votersRoutes from "./routes/voters.routes.js"

const app = express();
app.use(express.json());

app.use("/api/events", eventRoutes)
app.use("/api/parties", partiesRoutes)
app.use("/api/guides", guidesRoutes)
app.use("/api/voters", votersRoutes)

export default app;
