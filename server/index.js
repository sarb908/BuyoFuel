const express = require("express");
const cors = require("cors");

const conn = require("./config");
const TodoRouter = require("./routes/TodoRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(TodoRouter);
app.get("/", (req, res) => {
  res.status(200).send("home");
});

app.listen(8080, async () => {
  try {
    await conn;
    console.log("listening at port 8080, connected to db");
  } catch (err) {
    console.log(err);
  }
});
