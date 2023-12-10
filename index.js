const express= require('express');
const path= require('path');
const dotenv= require('dotenv');
const helmet= require('helmet');
const morgan= require('morgan'); 
const multer= require('multer'); 
const cors= require('cors'); 
const { default: mongoose } = require('mongoose'); 
const authRoute= require('./routes/auth'); 
const recipeRoute= require('./routes/recipe'); 
const app=express();
const fileStorageEngine= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images');
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },

});
const upload=multer({storage:fileStorageEngine});

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));

app.use("/api/auth",authRoute);
app.use("/api/recipe",recipeRoute);

app.use("/images",express.static(path.join(__dirname,"images")));

app.post('/api/upload',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.status(200).send(req.file.filename);
});

app.listen(process.env.PORT || 8000,()=>{
    console.log("Backend Running");
});
