const mongoose = require("mongoose");
const User = require("./users.js");

const Expenses = new mongoose.Schema({
    userid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    title:
    {
        type:String,
        required:true,
    },
    amount : 
    {
        type:Number,
        required:true,
    },
    description:
    {
        type:String
    },
    category: {
        type: String,
        enum: ['food', 'transport', 'entertainment', 'shopping', 'bills', 'health', 'education', 'other'],
        default: 'other'
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
        required: true
    },
    date:
    {
        type:Date,
        default : Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("expenses", Expenses);
