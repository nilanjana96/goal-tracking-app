const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

console.log("inside userRoutes");
router.post("/", registerUser);
console.log("after register user route");
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
