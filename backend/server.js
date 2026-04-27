require("dotenv").config({
    quiet:true
});

const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDB=require('./config/db.js');
const fs=require("fs");

const authRoutes=require('./routes/authRoutes.js')
const blogPostRoutes=require('./routes/blogPostRoutes.js');
const commentRoutes=require("./routes/commentRoutes.js")
const dashboardRoutes=require('./routes/dashboardRoutes.js')
const aiRoutes=require('./routes/aiRoutes.js')

const app=express()
app.use(express.json());

app.use(cors({
  origin: [
    'https://ai-powered-blog-app.netlify.app',
  ],
  credentials: true,
  allowedHeaders:["Content-Type","Authorization"]
}));

connectDB();

const uploadPath=path.join(__dirname,"uploads");
if(!fs.existsSync){
  fs.mkdirSync(uploadPath,{recursive:true});
}

app.use('/api/auth',authRoutes)
app.use('/api/posts',blogPostRoutes)
app.use('/api/comments',commentRoutes)
app.use('/api/dashboard-summary',dashboardRoutes)

app.use('/api/ai',aiRoutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Started on PORT:${PORT}`);
})
