const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies.token;

      if (!token) {
         res.status(401);
         throw new Error("Not authorized, please login.");
      }

      //verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      //get user id from token and get the user from the database, but exclude the password property of user
      const user = await User.findById(verified.id).select("-password");

      if (!user) {
         res.status(404);
         throw new Error("User not found");
      }

      if (user.role === "suspended") {
         res.status(400);
         throw new Error("User suspended, please contact support");
      }

      req.user = user;
      next();
   } catch (error) {
      res.status(401);
      throw new Error("Not authorized, please login.");
   }
});
//can access by only a certain role
const adminOnly =  asyncHandler(async (req, res, next) => {
   if (req.user && req.user.role === "admin") {
      next();
   } else {
      res.status(401);
      throw new Error("Not authorized as an admin.");
   }
});

//admin should be able to access whatever teacher can access
const teacherOnly =  asyncHandler (async (req, res, next) => {
   if (req.user.role === "teacher" || req.user.role === "admin") {
      next();
   } else {
      res.status(401);
      throw new Error("Not authorized as an teacher.");
   }
});

const verifiedOnly =  asyncHandler( async (req, res, next) => {
   if (req.user || req.user.isVerified) {
      next();
   } else {
      res.status(401);
      throw new Error("Not authorized, account not verified");
   }
});

// const studentOnly = async (req,res,next) => {

//    if(req.user && req.user.role === "student"){
//       next();
//    }else{
//       res.status(401);
//       throw new Error("Not authorized as an student.");
//    }
// }

module.exports = {
   protect,
   adminOnly,
   teacherOnly,
   verifiedOnly,
};