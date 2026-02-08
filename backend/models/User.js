const {Schema,model}=require('mongoose')

const UserSchmea=new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        trim:true,
    },
    profileImageUrl:{
        type:String,
        default:null,
    },
    bio:{
        type:String,
        default:""
    },

    role:{
        type:String,
        enum:["admin","member"],
        default:"member"
    },

},{timestamps:true});

module.exports= model("User",UserSchmea)