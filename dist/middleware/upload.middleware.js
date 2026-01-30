import multer from 'multer';
// Use memory storage so files are kept in memory buffer
// and can be uploaded directly to Cloudinary in the controller
const storage = multer.memoryStorage();
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const fileFilter = (_req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('❌ Only JPEG, PNG, and WEBP images are allowed'));
    }
};
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB max per file
    },
    fileFilter,
});
export default upload;
