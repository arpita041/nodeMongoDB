const express = require('express');

const app = express();

app.listen(3000, ()=>{
    console.log("listening to 3000 port")
})

//routes

app.get('/heroes',(req,res)=>{
    res.json({msg:"welcome to the api "});
})