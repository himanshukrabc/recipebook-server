const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');

// create a recipe
router.post('/create',async (req,res)=>{
    try{
        const newRecipe=await new Recipe(req.body);
        const savedPost = await newRecipe.save();
        res.status(200).send(savedPost);    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// update a recipe
router.put('/get/:id',async (req,res)=>{
    try{
        const recipe=await Recipe.findById(req.params.id);
        // console.log(recipe.userid,req.params.id);
        await recipe.updateOne({$set:req.body});
        res.status(200).send("Recipe Updated");    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// get a recipe
router.get('/get/:id',async (req,res)=>{
    try{
        const recipe=await Recipe.findById(req.params.id);
        res.status(200).send(recipe);    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// delete a recipe
router.delete('/get/:id',async (req,res)=>{
    try{
        const recipe=await Recipe.findById(req.params.id);
        // console.log(recipe.userid,req.params.id);
        if(recipe.userid===req.body.userid){            
            await recipe.deleteOne();
            res.status(200).send("Recipe Deleted");    
        }
        else{
            res.status(400).send("You can only delete your recipe!!");
        }
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// get all recipes of a user
router.get("/getall/:username",async(req,res)=>{
    try{
        const curuser = await User.findOne({username:req.params.username});
        // console.log(curuser);    
        const userRecipes = await Recipe.find({username:req.params.username});
        res.status(200).send(userRecipes);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);  
    }
});

// get all recipes
router.get("/suggest/all",async(req,res)=>{
    try{
        const userRecipes = await Recipe.find();
        res.status(200).send(userRecipes);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
}); 

// search recipes
router.get("/search/:val",async(req,res)=>{
    try{
        const val=req.params.val;
        const Recipes = await Recipe.find({$or:[{ 'recipename': {$regex: ".*" + val + ".*", $options:'i'} },{'ingridients':{$regex: ".*" + val + ".*", $options:'i'}}]});
        res.status(200).send(Recipes);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
}); 


module.exports = router;