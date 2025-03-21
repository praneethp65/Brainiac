"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./config/db.config"));
const user_route_1 = __importDefault(require("./routers/user.route"));
const content_router_1 = __importDefault(require("./routers/content.router"));
const share_router_1 = __importDefault(require("./routers/share.router"));
const cors_1 = __importDefault(require("cors"));
const embedding_service_1 = require("./services/embedding.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const allowedOrigins = [
    "http://localhost:5173",
    "https://brainiac-store.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "authorization", "Cookie"],
}));
app.use("/api/v1", user_route_1.default);
app.use("/api/v1", content_router_1.default);
app.use("/api/v1", share_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const embedding = (0, embedding_service_1.generateEmbedding)("This is a sample note to generate an embedding.");
app.listen(process.env.PORT, async () => {
    await (0, db_config_1.default)();
    console.log(`Server is running on port ${process.env.PORT}`);
});
