import * as dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });
