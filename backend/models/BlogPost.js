const {Schema,model}=require("mongoose")

const BlogPostSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        default:null,
    },
    tags:{
        type:[{type:String,}], //array of objects
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isDraft:{
        type:Boolean,
        default:false
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0,
    },
    generatedByAI:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

module.exports =model("BlogPost",BlogPostSchema);