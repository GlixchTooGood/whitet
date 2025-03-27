const db = require("../../middlewares/db")
const Users = db.getUsers();
const Packs = db.getPacks();
db.getBlooks();

//https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
function weightedRand(weights) {
    let sum = 0, r = Math.random();
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (r <= sum) return i;
    }
}
const main = async (req) => {
    if(!req.session.username){return {success:false,error:"You must be logged in to do this!"}}
    const user = await Users.findOne({username:req.session.username}).populate('ownedBlooks.blook');
    const pack = await Packs.findOne({ name: req.body.pack }).populate('blooks');
    if(user.shells<pack.cost){
        return {success: false, error:"You don't have enough shells to buy this pack!"};
    }
    if (!pack) {
        return { success: false, error: "No pack with that name found!" }
    }
    const blookWeights = pack.blooks.map(e => e.chance / 100);
    const earnedBlook = pack.blooks[weightedRand(blookWeights)];
    const blookIndex = user.ownedBlooks.findIndex(e => e.blook.equals(earnedBlook._id));
    if(blookIndex!==-1){
    user.ownedBlooks[blookIndex].count+=1;
    } else{
        user.ownedBlooks.push({
            blook: earnedBlook._id,
            count: 1
        });
    }
    user.shells-=pack.cost;
    await user.save();
    return { success: true, blookEarned: earnedBlook, shellsRemaining: user.shells };
}
module.exports = { main };