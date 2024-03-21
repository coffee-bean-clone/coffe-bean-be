import fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import Product from './models/Product';
import mongoConnection from './database/db';
import products from './database/data';

const server = fastify();

dotenv.config();

server.register(cors);

server.get('/', async (req, res) => {
  console.log(products.length);
  try {
    for (const productData of products) {
      try {
        const newProduct = new Product(productData);
        await newProduct.save();

        console.log(`${newProduct.title}이 추가되었습니다.`);
      } catch (error) {
        console.log(`중복 상품 '${productData.title}'은(는) 추가 되지 않았습니다.`);
        console.log(error);
      }

      // const newProduct = new Product(productData);
      // await newProduct.save();
      // console.log(`${newProduct.title}이 추가되었습니다.`);
    }
    console.log('상품 및 상품 이미지가 성공적으로 추가되었습니다.');
  } catch (error) {
    console.error('상품 추가 오류:', error);
  }
  res.send(products.length);
});

server.get('/product/all', async (_, res) => {
  const products = await Product.find({});
  res.send(products);
});

server.get('/product/sale', async (_, res) => {
  const products = await Product.find({ isSale: true });
  res.send(products);
});

server.get('/product/new', async (_, res) => {
  const products = await Product.find({ isNew: true });
  res.send(products);
});

server.get('/product/coffee', async (_, res) => {
  const products = await Product.find({ mainCategory: '커피' });
  res.send(products);
});

server.get('/product/tea', async (_, res) => {
  const products = await Product.find({ mainCategory: '티' });
  res.send(products);
});

if (process.env.PORT) {
  server.listen({ port: +process.env.PORT, host: '0.0.0.0' }, (error, address) => {
    if (error) console.log('서버 에러');
    mongoConnection();
    console.log(`${address} 포트에서 서버 시작했습니다.`);
  });
}
