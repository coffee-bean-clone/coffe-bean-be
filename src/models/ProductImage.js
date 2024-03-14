"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productImageSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Types.ObjectId, unique: true, ref: 'Product', requrie: true },
    // fileId: { type: mongoose.Types.ObjectId, ref:'File',requrie: true },
    detailImage: { type: String, required: true, unique: true },
    productImages: [{ type: String, required: true, unique: true }],
});
const ProductImage = mongoose_1.default.model('ProductImage', productImageSchema);
exports.default = ProductImage;
