const { accepts } = require("express/lib/request");
const db = require("../../middlewares/db")
const bcrypt = require("bcrypt")
const main = async (req)=>{
 const connection = await db.connect()
 const session = req.session;
 console.log(req.body)
 const username = req.body.username;
 const password = req.body.password;
 const hashedPassword = await bcrypt.hash(password, 10);

 const formattedUser = /^[a-zA-Z0-9_]+$/.test(username);
 const characterLimit = 16;
 const smallestLimit = 4;

 if (username.length > characterLimit) {
   if(connection){
     await db.disconnect(connection)
   }
   const msg = 'Username is too big';
   return { 'success': false, "msg": msg };
 } else if (username.length < smallestLimit) {
   if(connection){
     await db.disconnect(connection)
   }
   const msg = 'Username is too short';
   return { 'success': false, "msg": msg };
 }

 if (!formattedUser) {
   if(connection){
     await db.disconnect(connection)
   }
   const msg = "Username can't contain invalid characters";
   return { 'success': false, 'msg': msg };
 }
 const [data] = await connection.query("SELECT * FROM users where username=?",[username])
 if(data.length !== 0){
   if(connection){
     await db.disconnect(connection)
   }
   return {'success': false,'error': "Account exists."}
 }else{
    const [key] = await connection.query("SELECT * FROM accessKeys where token=?",[req.body.accesskey])
    if(key.length === 0){
        if(connection){
            await db.disconnect(connection)
        }
          return {'success': false,'error': "No access key!"}
     }else{
    const accesskey = key[0].token
     const [check2] = await connection.query("SELECT * FROM users where accessKey=?",[accesskey])
     if(check2.length === 0){
      session.username = username
      session.shells = 0
      session.role = "Common"
      session.loggedIn = true
      session.messages = 0;
      session.auctions = 0;
      session.pfp = "/images/logo.png";
      session.banner = "/images/banners/grey.png";
      await connection.query("INSERT INTO users(username,password,shells,role,accesskey,messages,auctions) values(?,?,?,?,?,?,?)",[username,hashedPassword,0,"Common", accesskey,0,0,"/images/logo.png","/images/banners/grey.png"])
      const [udi] = await connection.query("SELECT * FROM users where username=?",[username])
      session.uid = udi[0].uid
      if(connection){
        await db.disconnect(connection)
      }
      return {success: true}
    }else{
        if(connection){
            await db.disconnect(connection)
        }
          return {'success': false,'error': "Access key already exists to a account!"}
    }
    }
}
}
module.exports = {main}