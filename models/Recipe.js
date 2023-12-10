const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
        default:'',
        max:50
    },
    username:{
        type:String,
        required:true,
        default:'',
        max:50
    },
    recipename:{
        type:String,
        default:'',
        max:50
    },
    recipeImg:{
        type:String,
        default:'',
        default:""
    },
    ingridients:{
        type:Array,
        defauly:[]
    },
    directions:{
        type:Array,
        defauly:[]
    }
},{timestamps:true});

module.exports = mongoose.model("Recipe",recipeSchema);