import { Request, Response, NextFunction } from "express";
import { pool } from "../db/index";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

const generateToken = (email: string, id: string) => {
  return JWT.sign({ email, id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

class UserController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //destructure the user info from req.body
      const { username, password, email } = req.body;

      //make sure all the fields are filled
      if (!username && !password && !email) {
        res.status(401).json({ message: "Please include all fields" });
      }

      //make sure that the user do not exist
      const candidate = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (candidate.rows.length !== 0 && candidate.rows.length > 0) {
        res.status(400).json({ message: "User already exists." });
      }

      //bcrypt
      // salt the password
      const saltedPassword = await bcryptjs.genSalt(10);
      // hash the password
      const hashedPassword = await bcryptjs.hash(password, saltedPassword);

      //insert the user into db
      const newUser = await pool.query(
        "INSERT INTO users (username, password, email) values ($1, $2, $3) RETURNING *",
        [username, hashedPassword, email]
      );

      //destructure id and email to generate a token for a new user
      const { user_id, email: user_email } = newUser.rows[0];
      const token = generateToken(user_email, user_id);

      //get back user credential
      return res.status(201).json({
        message: "Use successfully created!",
        token,
        user_email,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        error.message;
      }
      console.log(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //destructure the user info from req.body
      const { email, password } = req.body;
      //make sure the fields aren't null
      if (!email && !password) {
        res.status(401).json({ message: "Please include all fields" });
      }

      //check if user exist in the db
      const registeredUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (!registeredUser.rows[0]) {
        res.status(404).json({
          message: "User not found.",
        });
      }

      //destructure data from registered user and change the names
      const {
        password: user_password,
        email: user_email,
        user_id,
      } = registeredUser.rows[0];

      // compare the incoming password with the user_password
      const isPasswordValid = await bcryptjs.compare(password, user_password);
      if (!isPasswordValid) {
        res.status(401).json({
          message: "User is not authorized.",
        });
      }
      //generate login token
      const token = generateToken(user_email, user_id);

      return res.status(200).json({
        message: "User was logged successfully",
        user_email,
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  };
  auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    return res.status(200).json({ token });
  };
}

export const userController = new UserController();
