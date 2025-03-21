"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addContent;
const contentValidation_util_1 = require("../utils/contentValidation.util");
const content_model_1 = __importDefault(require("../models/content.model"));
const mongoose_1 = require("mongoose");
const embedding_service_1 = require("../services/embedding.service");
const pinecone_index_1 = __importDefault(require("../config/pinecone.index"));
async function addContent(req, res) {
    try {
        const { error, data } = contentValidation_util_1.contentValidationSchema.safeParse(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: `Invalid content type, ${error.message}`
            });
        }
        const { type, title, description } = data;
        const link = req.body?.link;
        const userId = req.userId && typeof req.userId === 'string' ? new mongoose_1.Types.ObjectId(req.userId) : null;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id"
            });
        }
        const currDate = new Date();
        const createdAt = `${currDate.toLocaleDateString('en-US', { weekday: 'long' })}, ${currDate.toLocaleDateString()}`;
        const content = new content_model_1.default({
            link,
            type,
            title,
            description,
            createdAt,
            userId
        });
        await content.save();
        const textToEmbed = `${title} ${description} ${createdAt}`;
        const embedding = await (0, embedding_service_1.generateEmbedding)(textToEmbed);
        if (!embedding) {
            throw new Error(`Failed to generate embedding`);
        }
        const embeddingArray = Array.isArray(embedding)
            ? (Array.isArray(embedding[0]) ? embedding[0] : embedding)
            : typeof embedding === 'number'
                ? [embedding]
                : [];
        await pinecone_index_1.default.upsert([
            {
                id: content._id.toString(),
                values: embeddingArray,
                metadata: {
                    type,
                    title,
                    description,
                    createdAt,
                    userId: userId.toString(),
                    link: link || ''
                }
            }
        ]);
        return res.status(201).json({
            success: true,
            message: "Content added successfully",
            content
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Error while adding content, ${err}`
        });
    }
}
