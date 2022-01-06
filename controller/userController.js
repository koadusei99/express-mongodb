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

module.exports = { createUser, getUser };
