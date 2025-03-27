const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

mongoose.connect(process.env.connectionString).then(e=>console.log("connected!"))


const blookSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  chance: Number //percent chance
});
const userSchema = new mongoose.Schema({
  username: String
  , password: String//bcryptd string
  , shells: Number
  , role: String
  , messages: [{
    timeSent: Date,
    content: String
  }]
  ,auctions: [],
  ownedBlooks: [{
    blook: { type: mongoose.Schema.Types.ObjectId, ref: 'Blook' },
    count: Number
  }],
  packsOpened: Number,
  pfp: String,
  banner: String,
  discordId: String
});
const keySchema = new mongoose.Schema({
  token: String,
  discordId: String
});
const packSchema = new mongoose.Schema({
  name: String,
  blooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blook' }]
});
function getUsers() {
  return mongoose.model("User", userSchema);
}
function getKeys() {
  return mongoose.model("Key", keySchema);
}
function getPacks() {
  return mongoose.model("Pack", packSchema);
}
function getDatabase() {
  return mongoose;
}
function getBlooks() {
  return mongoose.model("Blook", blookSchema);
}

async function disconnect(connection) {

}

module.exports = {
  getDatabase,
  getUsers,
  disconnect,
  getKeys,
  getPacks,
  getBlooks
};
