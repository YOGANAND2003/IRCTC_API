const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, //Give PORT Number
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, //Give Password of MySQL database
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the database"); 
    connection.release();
  }
});

module.exports = pool.promise();
