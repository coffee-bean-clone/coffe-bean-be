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
  res.send('서버 접근 완료');
});

server.get('/data/add', async (req, res) => {
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
  const productTitles = [];
  for (const product of products) {
    productTitles.push(product.title);
  }
  res.send(`${productTitles} 데이터 추가 완료`);
});

server.get('/data/delete', async (req, res) => {
  await Product.deleteMany({});
  res.send(`데이터 삭제 완료`);
});

server.get('/data/view', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
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

server.get('/product/pouch_and_cupcoffee', async (_, res) => {
  const products = await Product.find({ mainCategory: '파우치&컵 커피' });
  res.send(products);
});
server.get('/product/pouch_and_cupcoffee/pouch', async (_, res) => {
  const condition = [{ mainCategory: '파우치&컵 커피' }, { subCategory: '파우치' }];
  const products = await Product.find({ $and: condition });
  res.send(products);
});
server.get('/product/pouch_and_cupcoffee/cupcoffee', async (_, res) => {
  const condition = [{ mainCategory: '파우치&컵 커피' }, { subCategory: '컵 커피' }];
  const products = await Product.find({ $and: condition });
  res.send(products);
});
server.get('/product/tea', async (_, res) => {
  const products = await Product.find({ mainCategory: '티' });
  res.send(products);
});
server.get('/product/tea/classic', async (_, res) => {
  const condition = [{ mainCategory: '티' }, { subCategory: '클래식 티' }];
  const products = await Product.find({ $and: condition });
  res.send(products);
});
server.get('/product/stick', async (_, res) => {
  const condition = [{ mainCategory: '스틱 커피' }];
  const products = await Product.find({ $and: condition });
  res.send(products);
});

if (process.env.PORT) {
  server.listen({ port: +process.env.PORT, host: '0.0.0.0' }, (error, address) => {
    if (error) console.log('서버 에러');
    mongoConnection();
    console.log(`${address} 포트에서 서버 시작했습니다.`);
  });
}
