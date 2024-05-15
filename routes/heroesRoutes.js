const express = require('express');
const heroesRouter = express.Router();
const Heroes = require('../model/heroesModelSchema');

const app = express();

app.use(express.json());

heroesRouter.post('/postHeroesData',(req,res,next)=>{
    console.log(req.body);
    const heroes = new Heroes({
        name: req.body.name,
        category:req.body.category,
        damageType:req.body.damageType,
        relation:{
            name: req.body.relation.name,
            bond: req.body.relation.bond
        }
    })
    heroes.save()
    .then((result)=>{
        console.log(result)
        res.send(result)
    }).catch(err=>{
        console.log(err)
    })
})

heroesRouter.get('/getHeroesData',async(req,res,next)=>{
    try{
        const results= await Heroes.find();
        console.log("results", results)
        res.send(results)
    }
    catch(error){
         console.log(error);
    }
})

//find the first doc by name
heroesRouter.get('/findByName/:name', async(req,res,next)=>{
    try{
        const name = req.params.name;
        console.log("name is", name)
      const result = await Heroes.findOne({name: name})
      console.log(result);
      res.send(result);
    }
    catch(err){
        console.log("err", err);
    }

})

// find by id

heroesRouter.get('/id/:id', async(req,res,next)=>{
    try{
        const id = req.params.id;
        console.log("id is", id)
      const result = await Heroes.findById(id)
      console.log(result);
      res.send(result);
    }
    catch(err){
        console.log("err", err);
    }
})
    //find by id and delete

    heroesRouter.delete('/:id', async(req,res,next)=>{
        try{
            const id = req.params.id;
            console.log("id is", id)
          const result = await Heroes.findByIdAndDelete(id)
          console.log(result);
          res.send(result);
        }
        catch(err){
            console.log("err", err);
        }

})

//find by if and update

heroesRouter.patch('/:id', async(req,res,next)=>{
    try{
        const id = req.params.id;
        console.log("id is", id);
        const update = req.body;
        const options = {new: true}             //when you pass { new: true } as the options, the findByIdAndUpdate() function returns the modified document, which is then logged and sent as the response.
      const result = await Heroes.findByIdAndUpdate(id,update,options)
    //  const result = await Heroes.findByIdAndUpdate(id,update)
      console.log(result);
      res.send(result);
    }
    catch(err){
        console.log("err", err);
    }
})

// insert multipleHeroes

heroesRouter.post('/addMultipleHeroes', async(req,res,next)=>{
    try{
        console.log("addSin",req.body)
     const hero = req.body;
      const result = await Heroes.insertMany(hero);
      console.log(result);
      res.send(result);
    }
    catch(err){
        console.log("err", err);
    }
})

// get the name doc where name starts with O letter

heroesRouter.get('/getNameWithLetter/:letter', async (req, res, next) => {
    try {
        const letter = req.params.letter;
        const regex = new RegExp(`^${letter}`, 'i'); // Case-insensitive regex pattern , i means it is case insensitive
        const query = { name: { $regex: regex } }; // Query to find names starting with the provided letter
        const result = await Heroes.find(query);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error status code
    }
});


heroesRouter.get('/sortData', async (req, res, next) => {
    try {
        const query = {'relation,name':1}; // Query to sort the data based on relation. name 1 means ascending order, -1 descending
        const result = await Heroes.find().sort(query);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error status code
    }
});

// update 

heroesRouter.patch('/updateData/:name/:relationBond', async (req, res, next) => {
    try {
        const name = req.params.name;
        const relationBond = req.params.relationBond

        const result = await Heroes.updateOne({name:name},{$set:{'relation.bond':relationBond}})
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error status code
    }
});

module.exports = heroesRouter;