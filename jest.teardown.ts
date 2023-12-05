import * as dotenv from 'dotenv';
import * as path from 'node:path';
import * as mongoose from 'mongoose';

dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

const teardown = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export default teardown;
