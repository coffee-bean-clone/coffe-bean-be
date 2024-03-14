import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // 이메일
  password: { type: String, required: true, minlength: 6, maxlength: 20 }, // 비밀번호
  name: { type: String, required: true }, // 이름
  address: { type: String, required: true }, // 주소
  phoneNumber: { type: String, required: true }, // 휴대폰번호
});

const User = mongoose.model('User', userSchema);
export default User;
