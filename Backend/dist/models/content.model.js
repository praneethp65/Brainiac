"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contentType = ["Document", "Links", "X", "Linkedin", "Youtube", "Pinterest", "Instagram", "Facebook"];
const contentSchema = new mongoose_1.Schema({
    link: {
        type: String,
    },
    type: {
        type: contentType,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});
const Content = (0, mongoose_1.model)('Content', contentSchema);
exports.default = Content;
