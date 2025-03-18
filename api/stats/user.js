const db = require("../../middlewares/db");

const main = async(req)=>{
 const connection = await db.connect()
 if(req.session.loggedIn){
    const [user] = await connection.query("SELECT * FROM users WHERE username=?",[req.session.username])
    if(user.length !== 0){
     const userData = {"username": user[0].username,"uid": user[0].uid,"shells": user[0].shells,"role": user[0].role,"messages": user[0].messages,"auctions": user[0].auctions,"pfp": user[0].pfp,"banner": user[0].banner}
     const session = req.session;
     session.username = userData.username;
     session.uid = userData.uid;
     session.shells = userData.shells;
     session.role = userData.role;
     session.messages = userData.messages;
     session.auctions = userData.auctions;
     session.pfp = userData.pfp;
     session.banner = userData.banner;
     return {'success': true,'user': userData}
    }else{
        if(connection){
          await db.disconnect(connection)
        }
        return {'success': false,'error': "Account under session doesnt exist"}
    }
 }else{
    if(connection){
     await db.disconnect(connection)
    }
    return {'success': false,'error': "You're not logged in"}
 }
}

module.exports = {main}