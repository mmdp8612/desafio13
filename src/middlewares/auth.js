import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const verifyAuth = (req, res, next) => {
    if(req.session.user){
        return next();
    }
    return res.render("login");
}

export const verifyAuthenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }
  
    const [, token] = authHeader.split(" ");

    jwt.verify(token, config.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Access denied. Invalid token.' });
      }
  
      req.user = user;     
      next();
    });
}

export const verifyIsUser = (req, res, next) => {
  if(req.user.role !== 'user'){
      return res.status(403).json({ error: 'Access denied. Only USER are allowed.' });
  }
  next();
}

export const isAdminOrPremium = (req, res, next) => {
  if(req.user.role !== 'admin' && req.user.role !== 'premium'){
      return res.status(403).json({ error: 'Access denied. Only ADMIN or PREMIUM are allowed.' });
  }
  next();
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({ error: 'Access denied. Only ADMIN are allowed.' });
    }
    next();
}

export const isUser = (req, res, next) => {
  if(req.session.user.role === 'user'){
    return next();
}
  return res.render("error", {message: "Solo los usuarios pueden acceder al chat."});
}