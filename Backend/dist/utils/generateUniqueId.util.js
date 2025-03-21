"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateUniqueId;
const uuid_1 = require("uuid");
function generateUniqueId(prefix) {
    const uniqueId = (0, uuid_1.v4)().replace(/-/g, '');
    return `${prefix}-${uniqueId.slice(0, 15)}`;
}
