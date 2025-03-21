"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getParticularNote;
const content_model_1 = __importDefault(require("../models/content.model"));
async function getParticularNote(req, res) {
    try {
        const { contentId } = req.params;
        const note = await content_model_1.default.findById(contentId);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: `Note not found`
            });
        }
        return res.status(200).json({
            success: true,
            note
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `server error in get particular note controller`
        });
    }
}
