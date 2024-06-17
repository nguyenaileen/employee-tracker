//install dependencies
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

//connect to database
let db;

try {
  const db = mysql2
    .createConnection({
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise();

  //start connection

  db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    start();
  });
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
}
