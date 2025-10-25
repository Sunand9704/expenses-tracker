const jwt = require("jsonwebtoken");

const verifyuser = (req,res,next) =>
{
    try{
    const usertoken = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
     const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
    
    next();
    }
    catch(err)
    {
        console.log("usernot verified");
    }
}

module.exports = verifyuser;