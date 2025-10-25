const express = require('express');
const bodyparser = require('body-parser');
const connectDB = require('./config/db.js');
const CORS = require("cors");
const expenses = require("./models/Expenses.js");
const User = require("./models/users.js");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
const port = 8000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(CORS({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Routes
app.use("/api/users" , userRoutes);

// app.use("/api/new",userRoutes);

app.listen(port, ()=>
{   connectDB();
    console.log("server is running on port", port);
})