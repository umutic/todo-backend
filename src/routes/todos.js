import express from "express";
const router = express.Router();

let todos = [];

// CREATE
router.post("/", (req, res) => {
  const todo = { id: Date.now(), title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// READ
router.get("/", (req, res) => res.json(todos));

// UPDATE
router.patch("/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo bulunamadı" });
  todo.done = req.body.done ?? todo.done;
  todo.title = req.body.title ?? todo.title;
  res.json(todo);
});

// DELETE
router.delete("/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ message: "Silindi" });
});

export default router;