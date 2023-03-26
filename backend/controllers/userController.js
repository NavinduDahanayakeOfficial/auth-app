const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { generateToken } = require("../utils");

//signup user
const signupUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   //validation
   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
   }

   //check whether the email is a valid one
   if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Email is not valid");
   }

   //check whether the password is strong enough
   if (!validator.isStrongPassword(password)) {
      res.status(400);
      throw new Error("Password not strong enough");
   }

   //check if user exists
   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("Email already in use.");
   }

   //create new user
   const user = await User.create({
      name,
      email,
      password,
   });

   //generate a token
   const token = generateToken(user._id);

   //send the token in a cookie to client(/browser)
   //send HTTP only cookie
   res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1day
      sameSite: "none", //backend and front end is not on same site
      secure: false, //make this false if not working
   });

   if (user) {
      const { _id, name, email, role, isVerified } = user;

      res.status(201).json({
         _id,
         name,
         email,
         phone,
         photo,
         role,
         isVerified,
         token,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

//login user
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password.");
   }

   //check if user exists
   const user = await User.findOne({ email });

   if (!user) {
      res.status(404);
      throw new Error("User not found,please signup");
   }

   const passwordIsCorrect = await bcrypt.compare(password, user.password);

   if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Invalid email or password");
   }

   //generate a token
   const token = generateToken(user._id);

   if (user && passwordIsCorrect) {
      res.cookie("token", token, {
         path: "/",
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400), //1day
         sameSite: "none",
         secure: false, //make this false if not working
      });

      const { _id, name, email, role, isVerified } = user;
      res.status(200).json({
         _id,
         name,
         email,
         phone,
         photo,
         role,
         isVerified,
         token,
      });
   } else {
      res.status(500);
      throw new Error("Something is wrong, please try again");
   }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
   //sending an empty string and expire already existing token
   res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0), //to logout --> expire the cookie
      sameSite: "none",
      secure: false, //make this false if not working
   });

   return res.status(200).json({ message: "Logout successfull" });
});

//to get a certain user's profile
const getUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      const { _id, name, email, role, isVerified } = user;
      res.status(200).json({
         _id,
         name,
         email,
         phone,
         photo,
         role,
         isVerified,
      });
   } else {
      res.status(400);
      throw new Error("user not found");
   }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      const { name, email, phone, photo, role, isVerified } = user;

      user.email = req.body.email || email;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.photo = req.body.photo || photo;

      //after updating user we need save the user

      const updatedUser = await user.save();

      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         phone: updatedUser.phone,
         photo: updatedUser.photo,
         role: updatedUser.role,
         isVerified: updatedUser.isVerified,
      });
   } else {
      res.status(400);
      throw new Error("user not found");
   }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findOneAndDelete({ _id: req.params.id });

   if (!user) {
      res.status(404);
      throw new Error("User not found, please sign up");
   }

   res.status(200).json({ message: "User deleted successfully" });
});

//get all the users for admin management
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find().sort("-createdAt").select("-password"); //get all the users and sort them in created order. (don't fetch the password)

   if (!users) {
      res.status(500);
      throw new Error("Something went wrong");
   }

   res.status(200).json(users);
});

//get logon status - to check whether user logged in or not
const loginStatus = asyncHandler(async (req, res) => {
   const token = req.cookies.token;

   if (!token) {
      return res.json(false);
   }

   //verify token
   const verified = jwt.verify(token, process.env.JWT_SECRET);

   if (verified) {
      return res.json(true);
   }

   return res.json(false);
});

//change user role
const changeUserRole = asyncHandler(async (req, res) => {
   const { id, role } = req.body;

   const user = await User.findById(id);

   if (!user) {
      res.status(404);
      throw new Error("User not found");
   }

   user.role = role;

   await user.save();

   res.status(200).json({ message: ` User role updated to ${role}` });
});

module.exports = {
   signupUser,
   loginUser,
   logoutUser,
   getUser,
   updateUser,
   deleteUser,
   getUsers,
   loginStatus,
   changeUserRole,
};
