"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(req) {
    try {
        const token = req.body.token;
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET environment variable is not defined.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        console.log(`Error while verifying JWT, ${err}`);
    }
}
