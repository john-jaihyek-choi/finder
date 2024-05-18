require("dotenv").config(); // Load environment variables
const { Pool } = require("pg");

const config = {
  connectionString: process.env.DATABASE_URL,
};
const db = new Pool(config);

module.exports = {
  query: (text, params) => db.query(text, params),
};
