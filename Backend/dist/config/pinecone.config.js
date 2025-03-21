"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) {
    throw new Error('Pinecone API key is missing');
}
const pinecone = new pinecone_1.Pinecone({
    apiKey,
});
exports.default = pinecone;
