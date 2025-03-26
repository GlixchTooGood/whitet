const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

await mongoose.connect('mongodb+srv://whitelet:dev@cluster0.uccns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String
  , password: String//bcryptd string
  , shells: Number
  , role: String
  , accesskey: { type: mongoose.Schema.Types.ObjectId, ref: 'Key' }
  , messages: [{
    timeSent: Date,
    content: String
  }]
  , auctions: [],
  pfp: String,
  banner: String
});
const keySchema = new mongoose.Schema({
  token: String
});
async function getUsers() {
  return mongoose.model("User", userSchema);
}
async function getKeys() {
  return mongoose.model("Key", keySchema);
}
async function getDatabase() {
  return mongoose;
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
  getDatabase,
  getUsers,
  disconnect,
  getKeys
};
