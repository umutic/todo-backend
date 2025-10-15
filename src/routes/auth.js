import express from "express";
import admin from "../firebase.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
    if (!token) return res.status(401).json({ message: "Token missing" });

    // 1️⃣ Firebase token doğrula
    const decoded = await admin.auth().verifyIdToken(token);

    // 2️⃣ Kullanıcıyı Firestore’da oluştur / güncelle
    const userData = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || "",
      picture: decoded.picture || "",
      createdAt: new Date().toISOString(),
    };

    const db = admin.firestore();
    await db.collection("users").doc(decoded.uid).set(userData, { merge: true });

    res.json({ message: "Authenticated", user: userData });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;