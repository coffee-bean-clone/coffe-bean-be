"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true }, // 이메일
    password: { type: String, required: true, minlength: 6, maxlength: 20 }, // 비밀번호
    name: { type: String, required: true }, // 이름
    address: { type: String, required: true }, // 주소
    phoneNumber: { type: String, required: true }, // 휴대폰번호
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
