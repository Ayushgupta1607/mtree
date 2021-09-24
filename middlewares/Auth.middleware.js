import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    let token;

    if (authToken && authToken.startsWith("Bearer ")) {
      token = authToken.substring(7, authToken.length);
    } else {
      res.sendStatus(403);
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.id) {
      const validated = await User.findById(decoded.id);

      if (!validated) {
        throw new Error("Unauthorized");
      }
      req.user = { id: decoded.id, email: decoded.email };
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    res.json({ status: 0, data: null, msg: "Token Invalid" });
  }
};
