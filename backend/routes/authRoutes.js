const {Router}=require('express')
const {registerUser,loginUser,getUserProfile}=require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload=require('../middlewares/uploadMiddleware'); 

const router=Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);


router.post('/upload-image', (req, res) => {
  upload.single("image")(req, res, function (err) {

    if (err) {
      console.error("🔥 MULTER ERROR:", err);
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    return res.status(200).json({ imageUrl });
  });
});