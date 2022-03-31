const express = require("express"); // common js module syntax
const router = express.Router(); // to use express router, bring it in
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
