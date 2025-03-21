"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteContent;
const content_model_1 = __importDefault(require("../models/content.model"));
async function deleteContent(req, res) {
    try {
        const userId = req.userId;
        const contentId = req.params.contentId;
        const toDelete = await content_model_1.default.deleteOne({ _id: contentId, userId });
        if (!toDelete) {
            return res.status(404).json({
                success: false,
                message: 'Content not found to delete'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Content deleted successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error while deleting content, ${err}`
        });
    }
}
