import jwt from 'jsonwebtoken';
import UserService from '../services/userServices.js';
const userService = new UserService();
import 'dotenv/config'

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ msg: "Unhautorized" });
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await userService.getById(decode.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = decode.exp;
    const timeUntilExp = tokenExp - now;

    if (timeUntilExp <= 300) {
      const newToken = await userService.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.cookie('token', newToken, { httpOnly: true })
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};