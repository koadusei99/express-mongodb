const express = require("express");
const mongoose = require("mongoose");
const {
  createUser,
  getUser,
  getAllUsers,
  getUserbyName,
  deleteUser,
  deleteMany,
  editUser,
} = require("./controller/userController");
require("dotenv").config();
const app = express();
// var cors = require("cors");

const port = 3001;

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:email", getUser);

app.get("/user/:name", getUserbyName);

app.get("/usersCount", getAllUsers);

app.post("/register", createUser);

app.delete("/delete", deleteUser);

app.delete("/deleteMany", deleteMany);

app.patch("/patch/:qemail", editUser);

// connect to db
mongoose.connect(process.env.MONGO);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
