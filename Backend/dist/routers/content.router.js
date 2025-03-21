"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addContent_controller_1 = __importDefault(require("../controllers/addContent.controller"));
const getContent_controller_1 = __importDefault(require("../controllers/getContent.controller"));
const deleteContent_controller_1 = __importDefault(require("../controllers/deleteContent.controller"));
const getParticularNote_controller_1 = __importDefault(require("../controllers/getParticularNote.controller"));
const queryContent_controller_1 = __importDefault(require("../controllers/queryContent.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const contentRouter = (0, express_1.Router)();
function contentHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            console.log(`Error while signing up, ${err}`);
        }
    };
}
contentRouter.post('/content', contentHandler(auth_middleware_1.default), contentHandler(addContent_controller_1.default));
contentRouter.get('/content', contentHandler(auth_middleware_1.default), contentHandler(getContent_controller_1.default));
contentRouter.delete('/content/:contentId', contentHandler(auth_middleware_1.default), contentHandler(deleteContent_controller_1.default));
contentRouter.get('/content/:contentId', contentHandler(auth_middleware_1.default), contentHandler(getParticularNote_controller_1.default));
contentRouter.post('/content/query', contentHandler(auth_middleware_1.default), contentHandler(queryContent_controller_1.default));
exports.default = contentRouter;
