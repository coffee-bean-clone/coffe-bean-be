"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    isSale: { type: Boolean, required: true },
    isNew: { type: Boolean, required: true },
    detailImage: { type: String, required: true },
    productImages: [{ type: String, required: true }],
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
