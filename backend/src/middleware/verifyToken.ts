import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId?: string;
  userEmail?: string;
  role?: string;
  id?: string;
  email?: string;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied .No Token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: String(decoded.userId || decoded.id),
      email: String(decoded.userEmail || decoded.email || ""),
      role: decoded.role,
    };

    if (!req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
