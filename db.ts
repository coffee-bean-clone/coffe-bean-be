import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnection = () => {
  try {
    if (process.env.MONGODB) {
      mongoose
        .connect(process.env.MONGODB)
        .then(() => console.log('MongoDB에 연결되었습니다.'))
        .catch((err) => console.error('MongoDB 연결 오류:', err));
    }
  } catch (error) {
    console.error(error);
  }
};
export default mongoConnection;
