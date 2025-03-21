"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI environment variable is not defined.");
        }
        await mongoose_1.default.connect(mongoURI);
        console.log(`Database connnected successfully, ${mongoose_1.default.connection.host}`);
    }
    catch (err) {
        console.log(`error while connecting to the database: ${err}`);
    }
}
