const mongoose = require('mongoose');

const url = "mongodb+srv://sunandvemavarapu_db_user:1jDuk66G7zgXl5Zj@cluster0.woxd5mo.mongodb.net/";

const connectDB = async () =>
{   try
    {
        await mongoose.connect(url);
        console.log("connected to database");
    }
    catch(err)
    {
        console.log("db was not connected :", err);
    }
}

module.exports = connectDB;