"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(id) {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET environment variable is not defined.");
        }
        return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: '30d' });
    }
    catch (err) {
        console.log(`Error while geneatig JWT, ${err}`);
    }
}
