const {Router}=require('express');
const router=Router()
const {protect}=require('../middlewares/authMiddleware');

const { generateBlogPost,
    generatedBlogPostIdeas,
    generateCommentReply,
    generatePostSummary}=require('../controllers/aiController.js');


router.post('/generate',protect,generateBlogPost);
router.post('/generate-ideas',protect,generatedBlogPostIdeas)
router.post('/generate-reply',protect,generateCommentReply);
router.post('/generate-summary',generatePostSummary)

module.exports =router;