"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentValidationSchema = void 0;
const zod_1 = require("zod");
exports.contentValidationSchema = zod_1.z.object({
    link: zod_1.z.string()
        .url()
        .or(zod_1.z.literal(''))
        .optional(),
    type: zod_1.z.enum(["Document", "Links", "X", "Linkedin", "Youtube", "Pinterest", "Instagram", "Facebook"]),
    title: zod_1.z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(200, { message: "Title must be at most 20 characters long" }),
    description: zod_1.z.string()
        .min(3, { message: "Description must be at least 3 characters long" })
        .max(3000, { message: "Description must be at most 3000 characters long" })
});
