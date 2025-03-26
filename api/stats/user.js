const db = require("../../middlewares/db");
const Users = db.getUsers();
const main = async(req)=>{
 if(req.session.loggedIn){
    const user = await Users.findOne({ username: req.session.username });
    if(user){
     const userData = {"username": user.username,"uid": user.uid,"shells": user.shells,"role": user.role,"messages": user.messages,"auctions": user.auctions,"pfp": user.pfp,"banner": user.banner}
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