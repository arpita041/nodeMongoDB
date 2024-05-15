// mongodb://localhost:27017

const monogoose = require('mongoose');

monogoose.connect("mongodb://localhost:27017/heroes", {useNewUrlParser: true});

monogoose.connection
          .once('open', ()=>{console.log("connected")})
          .on('error',(err)=>{console.log("error is: ",err)});