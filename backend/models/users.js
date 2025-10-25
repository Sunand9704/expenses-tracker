const mongoose = require("mongoose");
const expenses = require("./Expenses.js");

const UserSchema = new mongoose.Schema({
    Username : {type:String, required : true},
    email : {type: String,required : true},
    password : {type: String,required :true},
    Expenses : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "expenses",
    }],
},
{timestamps:true});

module.exports = mongoose.model("user", UserSchema);