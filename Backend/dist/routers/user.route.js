"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = __importDefault(require("../controllers/signup.controller"));
const signin_controller_1 = __importDefault(require("../controllers/signin.controller"));
const userRouter = (0, express_1.Router)();
function userHandler(fn) {
    return async (req, res) => {
        try {
            await fn(req, res);
        }
        catch (err) {
            console.log(`Error while signing up, ${err}`);
        }
    };
}
userRouter.post('/signup', userHandler(signup_controller_1.default));
userRouter.post('/signin', userHandler(signin_controller_1.default));
exports.default = userRouter;
