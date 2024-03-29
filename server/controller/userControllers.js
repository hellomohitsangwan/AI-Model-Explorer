import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc  Auth. user
// @route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isCreator: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isCreator: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user details");
  }
});



// @desc  GET user by id
// @route GET /api/users/:id
// @access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  update  user profile
// @route PUT /api/users/:id
// @access Private admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isCreator = req.body.isAdmin;

    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isCreator: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
