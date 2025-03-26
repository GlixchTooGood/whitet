const { accepts } = require("express/lib/request");
const db = require("../../middlewares/db")
const bcrypt = require("bcrypt");
const Users = db.getUsers();
const Keys = db.getKeys();
const main = async (req) => {
  const session = req.session;
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const accesskey = req.body.accesskey;
  const hashedPassword = await bcrypt.hash(password, 20);

  const formattedUser = /^[a-zA-Z0-9_]+$/.test(username);
  const characterLimit = 16;
  const smallestLimit = 4;

  if (username.length > characterLimit) {
    return { 'success': false, "msg": "Username is too long!" };
  } else if (username.length < smallestLimit) {
    return { 'success': false, "msg": "Username is too short!" };
  }

  if (!formattedUser) {
    return { 'success': false, 'msg': "Username can't contain invalid characters" };
  }

  const user = await Users.findOne({ username });
  if (user) {
    return { 'success': false, 'error': "Account exists." }
  } else {
    const key = await Keys.findOne({ token: accesskey });
    if (!key) {
      return { 'success': false, 'error': "Access key invalid!" }
    } else {
        session.username = username;
        session.shells = 0
        session.role = "Common"
        session.loggedIn = true
        session.messages = 0;
        session.auctions = 0;
        session.pfp = "/images/logo.png";
        session.banner = "/images/banners/grey.png";
        const createdUser = await Users.create({
          username,
          password: hashedPassword,
          shells: 0,
          role: "Common",
          messages: [],
          pfp: "/images/logo.png",
          banner: "/images/banners/grey.png"
        });
        session.uid = createdUser._id;
        await key.remove();
        return { success: true }
    }
  }
}
module.exports = { main }