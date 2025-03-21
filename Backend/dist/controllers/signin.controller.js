"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = signin;
const user_model_1 = __importDefault(require("../models/user.model"));
const userValidation_util_1 = require("../utils/userValidation.util");
const generateJWT_util_1 = __importDefault(require("../utils/generateJWT.util"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function signin(req, res) {
    try {
        const { error, data } = userValidation_util_1.userValidationSchema.safeParse(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        const { username, password } = data;
        const isUser = await user_model_1.default.findOne({ username });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, isUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = (0, generateJWT_util_1.default)(isUser._id);
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token,
            user: {
                _id: isUser._id,
                username: isUser.username,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            successs: false,
            message: `Error while signing in, ${err}`,
        });
    }
}
