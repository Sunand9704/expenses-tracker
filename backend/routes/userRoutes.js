const express = require("express");
const router = express.Router();
const {registerUser , login ,AddNewTask, getUserExpenses, updateExpense, deleteExpense, getMonthlySummary} = require("../controllers/usercontrollers.js");
const verifyuser = require('../middlewares/verifyuser.js');

router.post("/register",registerUser);
router.post("/login",login);
router.post("/Tasks",AddNewTask);
router.get("/expenses/:userId", getUserExpenses);
router.put("/expenses/:expenseId", updateExpense);
router.delete("/expenses/:expenseId", deleteExpense);
router.get("/summary/:userId", getMonthlySummary);

module.exports = router;