const BlogPost=require('../models/BlogPost');
const { post } = require('../routes/authRoutes');


const createPost=async(req,res)=>{
    try {
         const {title,content,coverImageUrl,tags,isDraft,generatedByAI}=req.body

         const slug=title
         .toLowerCase()
         .replace(/ /g,"-")
         .replace(/[^\w-]+/g,"");

         const newPost=new BlogPost({
            title,
            slug,
            content,
            coverImageUrl,
            tags,
            author:req.user._id,
            isDraft,
            generatedByAI,
         })

         await newPost.save();
         return res.status(201).json(newPost);
    } catch (error) {
            res.status(500).json({message:"failed to create post",error:error.message})
    }

}

const updatepost=async(req,res)=>{
    try {
        const post=await BlogPost.findById(req.params.id)
        if(!post) return res.status(404).json({message:"Post not found"});


        if(post.author.toString() !== req.user._id.toString() &&
            !req.user.isAdmin
        ){
            return res.status(403).json({
                message:"Not authorized to update this post"
            })
        }

        const updatedData=req.body;
        if(updatedData.title){
            updatedData.slug=updatedData.title.toLowerCase()
                            .replace(/ /g,"-")
                            .replace(/[^\w-]+/g,"")

        }
        const updatepost =await BlogPost.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new : true }
        )

        return res.status(200).json(updatepost);
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie updating post->',error);
    }
}


const deletePost=async(req,res)=>{
    try {
        console.log('id=',req.params.id);
        const post=await BlogPost.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"})

        await post.deleteOne();
        res.json({message:"Post deleted Successfully"})
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie deleting post->',error);
    }
    
}

const getPostBySlug=async (req,res)=>{
try {
        const post=await BlogPost.findOne({slug:req.params.slug});
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        return res.status(200).json(post);

    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie getting post by slug->',error);
    }

}

const getAllPosts=async(req,res)=>{
    try {
        const status=req.query.status || "published";
        const page=parseInt(req.query.page) || 1
        const limit=5;
        const skip=(page-1)*limit;

        let filter={};
        if(status ==="published")
            filter.isDraft=false
        else if(status ==="draft")
            filter.isDraft=true;

        const posts=await BlogPost.find(filter)
        .populate("author","name profileImageUrl")
        .sort({updatedAt:-1})
        .skip(skip)
        .limit(limit);

        const [totalCount,allCount,publishedCount,draftCount]= await Promise.all([
            BlogPost.countDocuments(filter),
            BlogPost.countDocuments(),
            BlogPost.countDocuments({isDraft:false}),
            BlogPost.countDocuments({isDraft:true})
        ]);

        return res.json({
            posts,
            page,
            totalPages:Math.ceil(totalCount/limit),
            totalCount,
            counts:{
                all:allCount,
                published:publishedCount,
                draft:draftCount
            },
        })

    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie updating post->',error);
    }
}

const getPostsByTag=async (req,res)=>{
    try {
        const post=await BlogPost.find({
            tags:req.params.tag,
            isDraft:false,
        }).populate("author","name profileImageUrl");

        if(!post.length){
            return res.status(400).json({
                message:"no posts found by these tags"
            })
        }

        return res.status(200).json(post)
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie getting posts by tag->',error);
    }
    
}

const searchPosts=async (req,res)=>{
    try {
            const q=req.query.q;
            const posts=await BlogPost.find({
                isDraft:false,
                $or:[
                    {title:{$regex:q,$options:"i" }},
                    {content:{$regex:q,$options:"i"}}
                ]
            }).populate('author',"name profileImageUrl")
            
            if(!posts && !posts.length){
                return res.status(404).json({message:"no posts found"})
            }

            return res.status(200).json(posts)

        } catch (error) {
                res.status(500)
                .json({message:"Internal server error",error:error.message})
                console.log('error whlie searching post->',error);
        }
    
    }

const incrementView=async (req,res)=>{

    try {
        await BlogPost.findByIdAndUpdate(req.params.id,{$inc: { views: 1}})
        return res.json({message:"View Count incremented successfully"});
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie incrementing view->',error);
    }

}

const likePost=async (req,res)=>{

    try {
        await BlogPost.findByIdAndUpdate(req.params.id,{$inc: { likes: 1}})
        return res.json({message:"like Count incremented successfully"});
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie liking post->',error);
    }

}

const getTopPosts=async (req,res)=>{

    try {
        const posts=await BlogPost.find({isDraft:false})
                    .sort({views:-1,likes:-1})
                    .limit(5);
          
        return res.json(posts);
    } catch (error) {
            res.status(500)
            .json({message:"Internal server error",error:error.message})
            console.log('error whlie getting top posts->',error);
    }

}

module.exports={

    createPost,
    updatepost,
    deletePost,
    getPostBySlug,
    getPostsByTag,
    searchPosts,
    incrementView,
    likePost,
    getTopPosts,
    getAllPosts
}