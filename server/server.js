const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const controller = require("./controllers/todos/");

const { getTodos, addTodo, updateTodo, deleteTodo } = controller;

const app = express();
app.use(cors());
app.use(bodyParser());
// const uri = `mongodb+srv://mahesh:mahesh7498@cluster0.w29rh.mongodb.net/test?retryWrites=true&w=majority`;
const uri = "mongodb://localhost:27017/TodoList";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(4000, () =>
      console.log(`Server running on http://localhost:4000`)
    )
  )
  .catch((error) => {
    throw error;
  });
app.get("/todos", getTodos);

app.post("/add-todo", addTodo);

app.put("/edit-todo/:id", updateTodo);

app.delete("/delete-todo/:id", deleteTodo);
