const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
   signupUser,
   loginUser,
   logoutUser,
   getUser,
   updateUser,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/getUser", protect, getUser); //to get a certain user's profile

router.patch("/updateUser", protect, updateUser)

module.exports = router;
