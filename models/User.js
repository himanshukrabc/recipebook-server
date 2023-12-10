const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    email:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:"",
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    } 
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);