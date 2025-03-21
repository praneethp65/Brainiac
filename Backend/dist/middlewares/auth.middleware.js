"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const verifyJWT_util_1 = __importDefault(require("../utils/verifyJWT.util"));
function auth(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decoded = (0, verifyJWT_util_1.default)(req.headers.authorization);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.log(`Error while authenticating user - ${err}`);
        return res.status(500).json({
            success: false,
            message: `Error while authenticating user, ${err}`
        });
    }
}
