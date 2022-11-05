const express = require("express");
const TodoModel = require("../models/TodoModel");

const TodoRouter = express.Router();
TodoRouter.post("/", async (req, res) => {
  const { title, status } = req.body;
  const task = new TodoModel({ title, status });
  const r = await task.save();
  res.send(r);
});

TodoRouter.get("/", async (req, res) => {
  const r = await TodoModel.find();
  res.send(r);
});

TodoRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { status, title } = req.body;
  const r = await TodoModel.findOneAndUpdate({ _id: id }, { status, title });
  res.send(r);
});

TodoRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const r = await TodoModel.findByIdAndDelete(id);
  res.send(r);
});
module.exports = TodoRouter;
