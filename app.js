const express = require('express');

const app = express();
const heroesRouter = require('./routes/heroesRoutes')
app.use(express.json());



app.use('/heroes', heroesRouter);


app.use((req,res,next)=>{
 const err = new Error("Page not found");
 err.status = 404;
  next(err);
})
// error handler method (the next(err) will execute this method)
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            message: err.message,
            status:err.status || 500
        }
    })
})
const monogoose = require('mongoose');

monogoose.connect("mongodb://localhost:27017/heroes", {useNewUrlParser: true});

monogoose.connection
          .once('open', ()=>{console.log("connected")})
          .on('error',(err)=>{console.log("error is: ",err)});

app.listen(3000,()=>{
    console.log("listening")
})

//module.exports = app;