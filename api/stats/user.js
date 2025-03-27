const db = require("../../middlewares/db");
const Users = db.getUsers();
const main = async(req) => {
    if (req.session.loggedIn) {
        const user = await Users.findOne({
            username: req.session.username
        });
        if (user) {
            const userData = {
                "username": user.username,
                "uid": user._id,
                "shells": user.shells,
                "role": user.role,
                "messages": user.messages,
                "auctions": user.auctions,
                "pfp": user.pfp,
                "banner": user.banner,
                "ownedBlooks": user.ownedBlooks,
                "packsOpened": user.packsOpened
            };
            const session = req.session;
            session.username = userData.username;
            session.uid = userData.uid;
            session.shells = userData.shells;
            session.role = userData.role;
            session.messages = userData.messages;
            session.auctions = userData.auctions;
            session.pfp = userData.pfp;
            session.banner = userData.banner;
            session.ownedBlooks = user.ownedBlooks;
            session.packsOpened = user.packsOpened;
            return {
                'success': true,
                'user': userData
            }
        } else {
            return {
                'success': false,
                'error': "Account under session doesnt exist"
            }
        }
    } else {
        return {
            'success': false,
            'error': "You're not logged in"
        }
    }
}

module.exports = {
    main
}