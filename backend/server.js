require("dotenv").config({
    quiet:true
});

const express=require("express");
const cors=require("cors");
const path=require("path")
const connectDB=require('./config/db.js')

const authRoutes=require('./routes/authRoutes.js')
const blogPostRoutes=require('./routes/blogPostRoutes.js');
const commentRoutes=require("./routes/commentRoutes.js")
const dashboardRoutes=require('./routes/dashboardRoutes.js')
const aiRoutes=require('./routes/aiRoutes.js')

const app=express()

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);

connectDB();

app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/posts',blogPostRoutes)
// app.use('/api/comments',dashboardRoutes)
// app.use('/api/dashboard-summary',commentRoutes)

// app.use('/api/ai',aiRoutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Started on PORT:${PORT}`);
})
