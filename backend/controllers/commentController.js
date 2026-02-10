const Comment=require('../models/Comment')
const BlogPost=require('../models/BlogPost')

// POST api/comments/:postId
const addComment=async (req,res)=>{
        try {
            const {postId}=req.params
            if(!postId || postId.trim().length===0){
                return res.status(400).json({message:"sorry postid is not defined"})
            }

            const {content,parentComment}=req.body

            if(!content || !content.trim().length){
                return res.status(400).json({message:"sorry comment can't be empty"})
            }

            const post=await BlogPost.findById(postId);

            if(!post){
                return res.status(404).json({message:"Post not found"});
            }

            const comment=await Comment.create({
                post:postId,
                content,
                author:req.user._id,
                parentComment:parentComment || null,
            })

            await comment.populate("author","name profileImageUrl")

            return res.status(201).json(comment)
        } catch (error) {
            res.status(500).json({message:"Failed to add comment",error:error.message})
        }
}

// GET api/comments/:postId
const getCommentsByPost=async (req,res)=>{
          try {
            const {postId}=req.params
            if(!postId || !postId.trim().length){
                return res.status(400).json({message:"Invalid postId"})
            }

            const comments=await Comment.find({post:postId});

            const commentMap={};
            comments.forEach(comment=>{
                comment=comment.toObject();
                comment.replies=[];
                commentMap[comment._id]=comment
            })

            const nestedComments=[];
            comments.forEach(comment=>{
                if(comment.parentComment){
                    const parent=commentMap[comment.parentComment]
                    if(parent){
                        parent.replies.push(commentMap[comment._id])
                    }
                }else{
                    nestedComments.push(commentMap[comment._id]);
                }
            })

            return res.json(nestedComments);

        } catch (error) {
            res.status(500).json({message:"Failed to get comments by post",error:error.message})
        }
}

//GET  api/comments/
const getAllComments=async (req,res)=>{
          try {
            const comments=await Comment.find()
                            .populate("author","name profileImageUrl")
                            .populate("post","title coverImageUrl")
                            .sort({createdAt:1});

            const commentMap={};
            comments.forEach(comment=>{
                comment=comment.toObject();
                comment.replies=[];
                commentMap[comment._id]=comment
            })

            const nestedComments=[];
            comments.forEach(comment=>{
                if(comment.parentComment){
                    const parent=commentMap[comment.parentComment];
                    if(parent){
                        parent.replies.push(commentMap[comment._id])
                    }
                }else{
                    nestedComments.push(commentMap[comment._id]);
                }
            })

            return res.status(200).json(nestedComments)
        } catch (error) {
            res.status(500).json({message:"Failed to fetch all comments",error:error.message})
        }
}
 
//DELETE  api/comments/:commentId
const deleteComment=async (req,res)=>{
          try {
            
            const {commentId}=req.params

            const comment=await Comment.findById(commentId);
            if(!comment){
                return res.status(404).json({message:"Comment not found"})
            }

            await Comment.deleteOne({_id:commentId});
            await Comment.deleteMany({parentComment:commentId});

            return res.json({message:"Comment and any replies deleted successfully"});

        } catch (error) {
            res.status(500).json({message:"Failed to delete comment",error:error.message})
        }
}

module.exports={
    addComment,
    getCommentsByPost,
    getAllComments,
    deleteComment
}