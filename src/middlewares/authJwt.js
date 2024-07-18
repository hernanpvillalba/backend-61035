import jwt from 'jsonwebtoken';
import UserService from '../services/userServices.js';
const userService = new UserService();
import 'dotenv/config'

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(403).json({ msg: "No Autorizado" });
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await userService.getById(decode.userId);
    if (!user) res.status(404).json({ msg: "Usuario No Encontrado" });
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = decode.exp;
    const timeUntilExp = tokenExp - now;

    if (timeUntilExp <= 300) {
      const newToken = userService.generateToken(user, "5m");
      console.log(" Actualizacion del token");
      res.set(`Authorization`, `Bearer ${newToken}`);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};    