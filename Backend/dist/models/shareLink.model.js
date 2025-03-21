"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    share: {
        type: Boolean,
        required: true,
        default: false,
    }
});
const Link = (0, mongoose_1.model)('Link', linkSchema);
exports.default = Link;
