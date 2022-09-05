"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const index_1 = require("../db/index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (email, id) => {
    return jsonwebtoken_1.default.sign({ email, id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
class UserController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //destructure the user info from req.body
                const { username, password, email } = req.body;
                //make sure all the fields are filled
                if (!username && !password && !email) {
                    res.status(401).json({ message: "Please include all fields" });
                }
                //make sure that the user do not exist
                const candidate = yield index_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
                if (candidate.rows.length !== 0 && candidate.rows.length > 0) {
                    res.status(400).json({ message: "User already exists." });
                }
                //bcrypt
                // salt the password
                const saltedPassword = yield bcryptjs_1.default.genSalt(10);
                // hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltedPassword);
                //insert the user into db
                const newUser = yield index_1.pool.query("INSERT INTO users (username, password, email) values ($1, $2, $3) RETURNING *", [username, hashedPassword, email]);
                //destructure id and email to generate a token for a new user
                const { user_id, email: user_email } = newUser.rows[0];
                const token = generateToken(user_email, user_id);
                //get back user credential
                return res.status(201).json({
                    message: "Use successfully created!",
                    token,
                    user_email,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    error.message;
                }
                console.log(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //destructure the user info from req.body
                const { email, password } = req.body;
                //make sure the fields aren't null
                if (!email && !password) {
                    res.status(401).json({ message: "Please include all fields" });
                }
                //check if user exist in the db
                const registeredUser = yield index_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
                if (!registeredUser.rows[0]) {
                    res.status(404).json({
                        message: "User not found.",
                    });
                }
                //destructure data from registered user and change the names
                const { password: user_password, email: user_email, user_id, } = registeredUser.rows[0];
                // compare the incoming password with the user_password
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user_password);
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
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                console.log(error);
            }
        });
        this.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            return res.status(200).json({ token });
        });
    }
}
exports.userController = new UserController();
