"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoConnection = () => {
    try {
        if (process.env.MONGODB) {
            mongoose_1.default
                .connect(process.env.MONGODB)
                .then(() => console.log('MongoDB에 연결되었습니다.'))
                .catch((err) => console.error('MongoDB 연결 오류:', err));
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = mongoConnection;
