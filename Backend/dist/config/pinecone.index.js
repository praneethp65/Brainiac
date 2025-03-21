"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_config_1 = __importDefault(require("./pinecone.config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const indexName = process.env.INDEX_NAME;
if (!indexName) {
    throw new Error(`Index name is not defined`);
}
exports.default = pinecone_config_1.default.Index(indexName);
