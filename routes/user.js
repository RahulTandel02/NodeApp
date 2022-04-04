const express = require("express");
const {
  getUser,
  postUser,
  loginUser,
  getUserById,
  updateUser,
} = require("../controller/user");
const Router = express.Router();
const { protect } = require("../middleware/auth");

Router.get("/", protect, getUser);
Router.post("/", postUser);
Router.post("/login", loginUser);
Router.get("/s/:id", getUserById);
Router.put("/:id", updateUser);

module.exports = Router;
