const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register',async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const user=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
        await user.save();
        res.status(200).send(user);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{
    try{        
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            res.status(404).json("user not found");
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) res.status(400).json("wrong password");
            else{
                res.status(200).json({username:user.username,userid:user._id});
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;