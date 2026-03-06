import mysql from "mysql2/promise";

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});
conn
  .getConnection()
  .then(() => console.log("✅ MySQL connected successfully"))
  .catch((err) => console.log("❌ MySQL connection failed:", err.message));

export default conn;
