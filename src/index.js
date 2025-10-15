import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Çok yakında..."));
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));