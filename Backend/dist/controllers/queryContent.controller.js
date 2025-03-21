"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = queryContent;
const embedding_service_1 = require("../services/embedding.service");
const pinecone_index_1 = __importDefault(require("../config/pinecone.index"));
const response_service_1 = require("../services/response.service");
async function queryContent(req, res) {
    try {
        const { query } = req.body;
        const userId = req.userId;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: `Query not found`
            });
        }
        const embedding = await (0, embedding_service_1.generateEmbedding)(query);
        if (!embedding) {
            throw new Error(`Error while generating embedding`);
        }
        const embeddingArray = Array.isArray(embedding)
            ? Array.isArray(embedding[0]) ? embedding[0] : embedding
            : typeof embedding === 'number'
                ? [embedding]
                : [];
        const queryResponse = await pinecone_index_1.default.query({
            vector: embeddingArray,
            topK: 10,
            includeMetadata: true,
        });
        const context = queryResponse.matches
            .filter(match => match.id && match.score && match.metadata)
            .map((match) => {
            const meta = match.metadata;
            if (!meta.type || !meta.title || !meta.description ||
                !meta.createdAt || !meta.userId || !meta.link) {
                console.warn(`Missing metadata fields for match ID: ${match.id}`);
                return null;
            }
            return {
                id: match.id,
                score: match.score,
                metadata: {
                    type: meta.type,
                    title: meta.title,
                    description: meta.description,
                    createdAt: meta.createdAt,
                    userId: meta.userId,
                    link: meta.link
                }
            };
        })
            .filter(item => item !== null);
        const response = await (0, response_service_1.generateResponse)({ query, context, userId });
        return res.status(200).json({
            success: true,
            message: `Request successful`,
            response,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server error while querying content, ${err}`
        });
    }
}
