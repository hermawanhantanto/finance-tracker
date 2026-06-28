import "dotenv/config";

import express from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.all("/api/auth/{*splat}", toNodeHandler(auth));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
