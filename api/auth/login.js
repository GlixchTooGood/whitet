const db = require("../../middlewares/db");
const bcrypt = require("bcrypt");
const Users = db.getUsers();

const main = async (req) => {
  const session = req.session;
  const username = req.body.username.trim();
  const password = req.body.password;
  const user = await Users.findOne({ username });
  if (!user) {
    return { 'success': false, 'error': "Account doesn't exist." };
  } else {
    console.log(user);
    const isValidPass = await bcrypt.compare(password, user.password);
    
    if (isValidPass) {
      session.username = user.username;
      session.uid = user._id;
      session.shells = user.shells;
      session.role = user.role;
      session.loggedIn = true;
      session.messages = user.messages;
      session.auctions = user.auctions;
      session.pfp = user.pfp;
      session.banner = user.banner;
      return { success: true };
    } else {
      return { success: false, 'error': "Invalid username or password." };
    }
  }
};

module.exports = { main };
