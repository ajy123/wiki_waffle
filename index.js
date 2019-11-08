const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.listen(process.env.PORT || 3000, ()=>{console.log("listening")})
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));


