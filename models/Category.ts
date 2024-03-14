import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});
// 커피샵 상품 카테고리 모델 생성
const Category = mongoose.model('Category', categorySchema);

export default Category;
