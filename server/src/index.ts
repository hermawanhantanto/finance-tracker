import "dotenv/config";

import express from "express";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use("/api/auth", authRouter);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
