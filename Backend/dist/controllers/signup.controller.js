"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = signup;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateJWT_util_1 = __importDefault(require("../utils/generateJWT.util"));
const userValidation_util_1 = require("../utils/userValidation.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function signup(req, res) {
    try {
        const { error, data } = userValidation_util_1.userValidationSchema.safeParse(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        const { username, password } = data;
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_model_1.default({
            username,
            password: hashedPassword,
        });
        const token = (0, generateJWT_util_1.default)(user._id);
        await user.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            successs: false,
            message: `Error while signing up, ${err}`,
        });
    }
}
