"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getAnotherUserBrain;
const shareLink_model_1 = __importDefault(require("../models/shareLink.model"));
const content_model_1 = __importDefault(require("../models/content.model"));
async function getAnotherUserBrain(req, res) {
    try {
        const shareLink = req.params.shareLink;
        const isUserBrain = await shareLink_model_1.default.findOne({ hash: shareLink });
        if (!isUserBrain) {
            return res.status(404).json({
                success: false,
                message: 'User brain not found'
            });
        }
        const isSharingEnabled = await shareLink_model_1.default.findOne({ hash: shareLink, share: true });
        if (!isSharingEnabled) {
            return res.status(403).json({
                success: false,
                messge: `Access denied`
            });
        }
        const userId = isUserBrain.userId;
        const userBrainCache = await content_model_1.default.find({ userId }).populate('userId', 'username');
        return res.status(200).json({
            success: true,
            message: 'User brain found',
            brain: userBrainCache
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error while getting another user brain, ${err}`
        });
    }
}
