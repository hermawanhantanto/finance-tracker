import "dotenv/config";

import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
