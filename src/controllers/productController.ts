import Product from '../models/Product';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getAllProducts(_: FastifyRequest, res: FastifyReply) {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
}
