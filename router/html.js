const express = require("express");
const router = express.Router();
const path = require('path');
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
})

router.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
})

router.get("/getkey",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'getkey.html'));
})

router.get("/stats",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'stats.html'));
})

router.get("/blooks",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'blooks.html'));
})

router.get("/market",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'market.html'));
})

router.get("/settings",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'settings.html'));
})

router.get("/credits",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'credits.html'));
})

router.get("/blackmarket",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'blackmarket.html'));
})

router.get("/chat",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'));
})

router.get("/auction",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'auction.html'));
})

router.get("/terms",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'terms.html'));
})

router.get("/staff",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'staff.html'));
})
module.exports = router