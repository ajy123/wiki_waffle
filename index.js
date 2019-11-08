const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.listen(3000, ()=>{console.log("listening")})
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));


