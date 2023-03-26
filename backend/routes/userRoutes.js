const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
   signupUser,
   loginUser,
   logoutUser,
   getUser,
   updateUser,
   deleteUser,
   getUsers,
   loginStatus,
   changeUserRole,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/getUser", protect, getUser); //to get a certain user's profile
router.patch("/updateUser", protect, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);
router.get("/getUsers", protect, adminOnly, getUsers);

router.get("/loginStatus", loginStatus);
router.post("/changeUserRole", protect, adminOnly, changeUserRole); //this should be patch or post? need to find out

module.exports = router;
