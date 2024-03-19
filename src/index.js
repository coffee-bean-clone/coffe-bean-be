"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("@fastify/cors"));
const Product_1 = __importDefault(require("./models/Product"));
const db_1 = __importDefault(require("./database/db"));
const data_1 = __importDefault(require("./database/data"));
const server = (0, fastify_1.default)();
dotenv_1.default.config();
server.register(cors_1.default);
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const productData of data_1.default) {
            try {
                const newProduct = new Product_1.default(productData);
                yield newProduct.save();
                console.log(`${newProduct.title}이 추가되었습니다.`);
            }
            catch (error) {
                console.log(`중복 상품 '${productData.title}'은(는) 추가 되지 않았습니다.`);
            }
        }
        console.log('상품 및 상품 이미지가 성공적으로 추가되었습니다.');
    }
    catch (error) {
        console.error('상품 추가 오류:', error);
    }
}));
server.get('/product/all', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({});
    res.send(products);
}));
server.get('/product/sale', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({ isSale: true });
    res.send(products);
}));
server.get('/product/new', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({ isNew: true });
    res.send(products);
}));
server.get('/product/coffee', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({ mainCategory: '커피' });
    res.send(products);
}));
server.get('/product/tea', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({ mainCategory: '티' });
    res.send(products);
}));
if (process.env.PORT) {
    server.listen({ port: +process.env.PORT }, (error, address) => {
        if (error)
            console.log('서버 에러');
        (0, db_1.default)();
        console.log(`${address} 포트에서 서버 시작했습니다.`);
    });
}
