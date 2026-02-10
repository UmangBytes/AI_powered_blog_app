const {Router}=require('express');

const router=Router();
const {protect}=require('../middlewares/authMiddleware');
const {getDashboradSummary}=require('../controllers/dashboardController');

const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role ==='admin'){
        next();
    }else{
        res.status(403).json({message:"Admin access only"});
    }
}

router.get('/',protect,adminOnly,getDashboradSummary);

module.exports=router