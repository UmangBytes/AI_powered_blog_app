const {Schema,model}= require("mongoose");

const CommentSchema= new Schema({

    post:{
        type:Schema.Types.ObjectId,
        ref:"BlogPost",
        required:true,
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    content:{
        type:String,
        required:true,
    },

    parentComment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        default:null,
    }

},
{timestamps:true}
);

module.exports=model("Comment",CommentSchema);