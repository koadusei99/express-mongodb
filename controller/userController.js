const User = require("../models/userModel");

const createUser = async (req, res) => {
  let newGuy = new User();
  newGuy.name = req.body.name;
  newGuy.role = req.body.role;
  newGuy.email = req.body.email;
  try {
    let inserted = await newGuy.save();
    console.log(inserted);
    res.json({ inserted });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const getUser = async (req, res) => {
  //TODO papa
  try {
    let user = await User.findOne({ email: req.params.email });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json({ numberofUsers: users.length, users });
  } catch (err) {
    console.log(err);
  }
};

const getUserbyName = async (req, res) => {
  //TODO papa
  try {
    let user = await User.findOne({ name: req.params.name });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const deleteUser = async (req, res) => {
  //TODO papa
  try {
    let user = await User.findOne({ name: req.body.name }).exec();
    if (!user) {
      res.json({ error: "User no dey exist" });
    }
    const result = await user.deleteOne({ name: req.body.name });
    res.json({ message: "deleted😢" });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const deleteMany = async (req, res) => {
  const { names } = req.body;
  let count = 0;
  //TODO papa
  try {
    for (let i = 0; i < names.length; i++) {
      let user = await User.findOne({ name: names[i] });
      if (user) {
        await user.delete({ name: names[i] });
        count++;
      }
    }
    return res.json({ message: `deleted ${count}` });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const editUser = async (req, res) => {
  const { name, role, email } = req.body;
  const { qemail } = req.params;

  try {
    let user = User.findOne({ email: qemail });
    if (!user) {
      res.json({ error: "User not found" });
      return;
    }
    let updateDetails = {};
    updateDetails.name = name ? name : user.name;
    updateDetails.email = email ? email : user.email;
    updateDetails.role = role ? role : user.role;
    let updated = await User.updateOne({ email: qemail }, updateDetails);
    console.log(updated);
    res.json({ updated });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserbyName,
  deleteUser,
  deleteMany,
  editUser,
};
