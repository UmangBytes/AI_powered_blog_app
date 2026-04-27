const multer = require('multer');
const path = require('path');

const uploadPath = path.resolve("uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg .jpg and .png formats are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;