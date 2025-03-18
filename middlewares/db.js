const mysql = require('mysql2/promise');
const path = require("path")
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbDb,
      charset: process.env.dbCharSet,
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

async function disconnect(connection) {
  if (connection) {
    try {
      await connection.end();
    } catch (err) {
      console.error('Error disconnecting from the database:', err);
      throw err;
    }
  } else {
    console.error('No connection to disconnect');
  }
}

module.exports = {
  connect,
  disconnect,
};
