import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ 
      auth: false,
      detail: "Missing Token" 
    });
  }else{
    jwt.verify(token, process.env.JWT, function (err, user) {
      if (err) {
        return res.json({ 
          auth: false,
          detail: "Invalid Token" 
        });
      }
      req.user = user;
      next();
    });
  }
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id) {
      next();
    } else {
      return res.json({ 
        auth: false,
        detail: "You are not authorized!" 
      });
    }
  });
}
