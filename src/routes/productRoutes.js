"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const productController_1 = require("../controllers/productController");
const server = (0, fastify_1.default)();
server.get('/all', productController_1.getAllProducts);
exports.default = server;
