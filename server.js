const express = require('express');
const app = express();
const apiRouter = require("./router/api");
const htmlRouter = require("./router/html");
const sessionMiddleware = require("./middlewares/session");
const path = require('path');
const bot = require("./bot/main.js");
require('dotenv').config({ path: path.join(__dirname, '.env') });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.use(sessionMiddleware);//test of commit by cool duck

app.use(apiRouter);
app.use(htmlRouter);

app.engine('html', require('ejs').renderFile);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

const port = 8080;
const host = '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server up on host:${host} on port:${port}`);
});
bot.runBot();
