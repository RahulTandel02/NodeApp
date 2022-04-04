const mongoose = require("mongoose");
const userSchema = require("../models/user");

const getUser = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

const postUser = async (req, res) => {
  try {
    const user = req.body;
    const newuser = await new userSchema(user);
    await newuser.save();
    const token = newuser.getSignedToken();
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({
      success: false,
      message: "Please Enter Email and Password",
    });
    return;
  }
  try {
    const user = await userSchema.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    const token = user.getSignedToken();
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("No data with ID");
  } else {
    try {
      const user = await userSchema.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};

const updateUser = async (req, res) => {
  console.log("worked");
  const { id } = req.params;

  const body = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "No user Exist" });
  } else {
    try {
      const updatedUser = await userSchema.findByIdAndUpdate(id, body, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  }
};

module.exports = {
  getUser,
  postUser,
  loginUser,
  getUserById,
  updateUser,
};
