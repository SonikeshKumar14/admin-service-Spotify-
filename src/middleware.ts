import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.token;

    if (!token) {
      res.status(403).json({
        message: "Please Login",
      });
      return;
    }

    const { data } = await axios.get(`${process.env.USER_URL || "http://localhost:5000"}/api/v1/user/me`, {
      headers: {
        token,
      },
    });
    
    req.user = data; 

    next();
  } catch (error) {
    res.status(403).json({
      message: "Please Login",
    });
  }
};

// multer setup
import multer from 'multer';

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile; 

