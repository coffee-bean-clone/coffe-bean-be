import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, unique: true, ref: 'Product', requrie: true },
  // fileId: { type: mongoose.Types.ObjectId, ref:'File',requrie: true },
  detailImage: { type: String, required: true, unique: true },
  productImages: [{ type: String, required: true, unique: true }],
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

export default ProductImage;
