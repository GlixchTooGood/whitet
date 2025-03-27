const path = require("path");
const mongoose = require('mongoose');
//require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

mongoose.connect('mongodb+srv://whitelet:dev@cluster0.uccns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(e=>console.log("connected!"))

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
    name: String,
    imageURL: String,
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

});
function getUsers() {
  return mongoose.model("User", userSchema);
}
function getKeys() {
  return mongoose.model("Key", keySchema);
}
function getDatabase() {
  return mongoose;
}

async function disconnect(connection) {

}

module.exports = {
  getDatabase,
  getUsers,
  disconnect,
  getKeys
};
