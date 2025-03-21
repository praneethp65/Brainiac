"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shareBrain_controller_1 = __importDefault(require("../controllers/shareBrain.controller"));
const getAnotherUserBrain_controller_1 = __importDefault(require("../controllers/getAnotherUserBrain.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const shareRouter = (0, express_1.Router)();
function shareHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            console.log(`Error while signing up, ${err}`);
        }
    };
}
shareRouter.post('/share/brain', shareHandler(auth_middleware_1.default), shareHandler(shareBrain_controller_1.default));
shareRouter.get('/brain/:shareLink', shareHandler(getAnotherUserBrain_controller_1.default));
exports.default = shareRouter;
