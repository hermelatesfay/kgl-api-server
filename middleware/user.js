const jwt = require("jsonwebtoken")
require("dotenv")

const authMiddleware = (req, res, next)=>{
     const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized", reason: err.message })
            } else {
                
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}

    //check user role

const authorize = (...allowedRoles) => {
  return (req, res, next) => {

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};



module.exports = {authMiddleware, authorize}