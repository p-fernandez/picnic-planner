import * as dotenv from 'dotenv';
import * as path from 'node:path';

// TODO: Locate it in a better place as this can lead to errors
dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });
