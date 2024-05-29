import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;
dotenv.config();

const config = {
  connectionString: process.env.DATABASE_URL,
};
const db = new Pool(config);

export default {
  query: (text, params) => db.query(text, params),
};
