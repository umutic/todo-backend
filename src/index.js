import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("✅ Todo API çalışıyor (Vercel sürümü)"));
app.use("/api/todos", todoRoutes);

// ⛔️ app.listen() YOK
// ✅ Express uygulamasını serverless fonksiyon olarak dışa aktar
export default app;