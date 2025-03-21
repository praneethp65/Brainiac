"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getContent;
const content_model_1 = __importDefault(require("../models/content.model"));
async function getContent(req, res) {
    try {
        const userId = req.userId;
        const content = await content_model_1.default.find({ userId }).populate('userId', 'username');
        return res.status(200).json({
            success: true,
            message: 'Content fetched successfully',
            content
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Error while getting content, ${err}`
        });
    }
}
