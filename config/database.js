const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//Connection
console.log('Your dabatase is running at ===>', process.env.DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('DB CONNECT SUCCESSS!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

