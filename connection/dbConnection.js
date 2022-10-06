import { createPool } from "mysql";
import { POOL} from "../config/config.js";
import myLogger from "../winstonLog/winston.js";
import dotenv from 'dotenv';
dotenv.config();
let configDB = {
    host: process.env.UDPM11_HOST,
    user: process.env.UDPM11_USER_DB,
    password: process.env.UDPM11_PASSWORD,
    database: process.env.UDPM11_DB_NAME,
    pool: POOL,
    port: process.env.UDPM11_PORT_DB
};
myLogger.info("DB config: %o",configDB);
let connection = createPool(configDB);
export default connection;