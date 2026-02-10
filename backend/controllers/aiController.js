const {GoogleGenAI}=require('@google/genai')

const {
    blogPostIdeasPrompt,
    generateReplyPrompt,
    blogSummaryPrompt
}=require('../utils/prompts');

const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// 'api/ai/generate'
const generateBlogPost=async (req,res)=>{

    try {
        const { title , tone} =req.body

        if(!title || !tone){
            return res.status(400).json({message:"Missing required fields"});
        }

        const prompt=`Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheadings, code examples if relvant, and a conclusion.`;

        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt,
        })

        let rawText=response.text;
        res.status(200).json(rawText)

    } catch (error) {
        return res.status(500).json({
            message:"Failed to generate blog post",
            error:error.message,
        })
    }
}



// 'api/ai/generate-ideas'
const generatedBlogPostIdeas=async (req,res)=>{
    try {
        const {topics}=req.body;

        if(!topics){
            return res.status(400).json({message:"Missing required fields"})
        }

        const prompt=blogPostIdeasPrompt(topics);

        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt,
        })

        let rawText=response.text;

        const cleanedText=rawText
                            .replace(/^```json\s*/,"")
                            .replace(/```$/,"")
                            .trim();

        const data=JSON.parse(cleanedText)
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            message:"Failed to generate blog post",
            error:error.message,
        })
    }
}

// 'api/ai/generate-reply'
const generateCommentReply=async (req,res)=>{
    try {
         const {author,content}=req.body;

         if(!content){
            return res.status(400).json({message:"Missing required fields"});
         }

         const prompt=generateReplyPrompt({author,content});

         const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt,
         })

         let rawText=response.text
         return res.status(200).json(rawText)

    } catch (error) {
        return res.status(500).json({
            message:"Failed to generate blog post",
            error:error.message,
        })
    }
}


// 'api/ai/generate-summary'
const generatePostSummary=async (req,res)=>{
    try {
        const {content}=req.body

        if(!content){
            return res.status(400).json({message:"Missing required fields"});
        }

        const prompt=blogSummaryPrompt(content);

        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt
        })

        let rawText=response.text

        const cleanedText=rawText
                            .replace(/^```json\s*/,"")
                            .replace(/```$/,"")
                            .trim();

        const data=JSON.parse(cleanedText)
        res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({
            message:"Failed to generate blog post",
            error:error.message,
        })
    }
}

module.exports={
    generateBlogPost,
    generatedBlogPostIdeas,
    generateCommentReply,
    generatePostSummary
}