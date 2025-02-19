import dotenv from "dotenv";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const { Pool } = pg;

const config = {
  connectionString: process.env.DATABASE_URL,
};
const db = new Pool(config);

export default {
  query: (text, params) => db.query(text, params),
};
