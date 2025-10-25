require('dotenv').config();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const expenses = require("../models/Expenses.js");
const jwt = require('jsonwebtoken');
const secretkey = process.env.secret;
exports.registerUser = async(req,res)=>
{   
    console.log("coming to backend");
    try
    {
    const {Username,email,password} = req.body;    
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    const user = new User({Username, email, password : hashed});
    await user.save();
    const accesstoken = jwt.sign({username:user.Username,email:user.email},secretkey);
    res.status(201).json({
        message : "user saved sucessfully",
        newuser : user,
        token : accesstoken,
    });
    }
    catch(err)
    {
        res.status(401).json({
            message: err,
        })
    }
};

exports.login = async(req,res)=>
{
    try
    {
        const {email ,password } = req.body;
        const check = await User.findOne({email});
        if(!check)
        {
            return res.status(401).json({
                message : "user not found"
            });
        }
        const pass = await bcrypt.compare(password, check.password);
        if(!pass)
        {
            return res.status(401).json({
                message : "password not matched"
            })
        }
        const accesstoken = jwt.sign({username:check.Username,email:check.email},secretkey);
        return res.status(201).json({
            Message : "userverified Sucessfully",
            token: accesstoken,
            userId: check._id,
            user: {
                _id: check._id,
                Username: check.Username,
                email: check.email
            }
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message:"Internal server error"
        });
    }
};

exports.AddNewTask = async(req,res)=>{
    try {
        console.log("coming to backend");
        const data= req.body;
        const newtask = new expenses({
            title : data.title,
            amount : data.amount,
            description: data.description,
            category: data.category || 'other',
            type: data.type || 'expense',
            date: data.date,
            userid : data.userid
        });
        await newtask.save();

        const userdata = await User.findById(data.userid);
        console.log("user data fetched:", userdata);
        console.log("newtaskID :",newtask._id);
        
        userdata.Expenses.push(newtask._id);
        await userdata.save();
        return res.status(200).json({
            message: "Transaction added successfully",
            transaction: newtask
        });
    } catch (error) {
        return res.status(401).json({
            Message : "Data Was not Added",
            err : error
        });
    }
};

exports.getUserExpenses = async(req,res)=>{
    try {
        const {userId} = req.params;
        const userExpenses = await expenses.find({userid: userId}).sort({date: -1});
        return res.status(200).json({
            expenses: userExpenses
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching expenses",
            error: error.message
        });
    }
};

exports.updateExpense = async(req,res)=>{
    try {
        const {expenseId} = req.params;
        const updateData = req.body;
        
        const updatedExpense = await expenses.findByIdAndUpdate(
            expenseId, 
            updateData, 
            {new: true}
        );
        
        if(!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        
        return res.status(200).json({
            message: "Expense updated successfully",
            expense: updatedExpense
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating expense",
            error: error.message
        });
    }
};

exports.deleteExpense = async(req,res)=>{
    try {
        const {expenseId} = req.params;
        
        const deletedExpense = await expenses.findByIdAndDelete(expenseId);
        
        if(!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        
        // Remove expense from user's expenses array
        await User.findByIdAndUpdate(
            deletedExpense.userid,
            { $pull: { Expenses: expenseId } }
        );
        
        return res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting expense",
            error: error.message
        });
    }
};

exports.getMonthlySummary = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {month, year} = req.query;
        
        // Get current month/year if not provided
        const currentDate = new Date();
        const targetMonth = month || currentDate.getMonth() + 1;
        const targetYear = year || currentDate.getFullYear();
        
        // Create date range for the month
        const startDate = new Date(targetYear, targetMonth - 1, 1);
        const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);
        
        const monthlyTransactions = await expenses.find({
            userid: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        
        // Calculate totals
        let totalIncome = 0;
        let totalExpenses = 0;
        const categoryBreakdown = {};
        
        monthlyTransactions.forEach(transaction => {
            if(transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
                categoryBreakdown[transaction.category] = 
                    (categoryBreakdown[transaction.category] || 0) + transaction.amount;
            }
        });
        
        const profitLoss = totalIncome - totalExpenses;
        
        return res.status(200).json({
            month: targetMonth,
            year: targetYear,
            totalIncome,
            totalExpenses,
            profitLoss,
            categoryBreakdown,
            transactions: monthlyTransactions
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching monthly summary",
            error: error.message
        });
    }
};