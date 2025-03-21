"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shareBrain;
const generateUniqueId_util_1 = __importDefault(require("../utils/generateUniqueId.util"));
const user_model_1 = __importDefault(require("../models/user.model"));
const shareLink_model_1 = __importDefault(require("../models/shareLink.model"));
async function shareBrain(req, res) {
    try {
        const { share } = req.body;
        const userId = req.userId;
        const user = await user_model_1.default.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isShareLinkExists = await shareLink_model_1.default.findOneAndUpdate({ userId }, { share }, { new: true });
        if (isShareLinkExists) {
            return res.status(200).json({
                success: true,
                message: 'Share link already exists',
                link: isShareLinkExists
            });
        }
        const username = user.username;
        const hash = (0, generateUniqueId_util_1.default)(username);
        const link = new shareLink_model_1.default({
            hash,
            userId,
            share
        });
        await link.save();
        return res.status(201).json({
            success: true,
            message: 'Brain share link generated successfully',
            link: link
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error while sharing brain, ${err}`
        });
    }
}
