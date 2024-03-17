import fastify from 'fastify';
import { getAllProducts } from '../controllers/productController';

const server = fastify();

server.get('/all', getAllProducts);

export default server;
