"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbedding = generateEmbedding;
const hf_config_1 = __importDefault(require("../config/hf.config"));
async function generateEmbedding(text) {
    try {
        const model = 'sentence-transformers/all-mpnet-base-v2';
        const embedding = await hf_config_1.default.featureExtraction({
            model: model,
            inputs: text,
        });
        return embedding;
    }
    catch (err) {
        console.log(`Error while generating embeddings, ${err}`);
    }
}
