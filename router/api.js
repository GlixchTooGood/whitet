const express = require("express")
const router = express.Router()
const api = require("../api")

router.post("/api/v2/login",async(req,res)=>{
try{
 let api_call = await api.login.main(req)
 res.send(api_call)
} catch(e){res.send({success:false,error:"Error: "+e});}
})

router.post("/api/v2/register",async(req,res)=>{
    let api_call = await api.register.main(req)
    res.send(api_call)
})

router.get("/api/v2/user",async(req,res)=>{
    let api_call = await api.getUser.main(req)
    res.send(api_call)
})

router.get("/logout",async(req,res)=>{
 if(req.session && req.session.loggedIn){
   req.session.destroy()
   res.redirect("/")
 }else{
    res.redirect("/")
 }
})

module.exports = router