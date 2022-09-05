import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(403).json({
        message: "Invalid token",
      });
    }

    const decoded = JWT.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log(error);
    res.status(401).json({
      message: "User did not pass check process.",
    });
  }
};

export default authMiddleware;
