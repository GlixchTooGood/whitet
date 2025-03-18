const db = require("../../middlewares/db");
const bcrypt = require("bcrypt");

const main = async (req) => {
  const session = req.session;
  const connection = await db.connect();
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password;
  const [data] = await connection.query("SELECT * FROM users WHERE username=?", [username]);
  
  if (data.length === 0) {
    if (connection) {
      await db.disconnect(connection);
    }
    return { 'success': false, 'error': "Account doesn't exist." };
  } else {
    const isValidPass = await bcrypt.compare(password, data[0].password);
    
    if (isValidPass) {
      session.username = data[0].username;
      session.uid = data[0].uid;
      session.shells = data[0].shells;
      session.role = data[0].role;
      session.loggedIn = true;
      session.messages = data[0].messages;
      session.auctions = data[0].auctions;
      session.pfp = data[0].pfp;
      session.banner = data[0].banner;
      if (connection) {
        await db.disconnect(connection);
      }
      return { success: true };
    } else {
      if (connection) {
        await db.disconnect(connection);
      }
      return { success: false, 'error': "Invalid username or password." };
    }
  }
};

module.exports = { main };
