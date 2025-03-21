"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inference_1 = require("@huggingface/inference");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.HUGGING_FACE_API_KEY;
if (!apiKey) {
    throw new Error(`API key is missing`);
}
const hfClient = new inference_1.HfInference(apiKey);
exports.default = hfClient;
