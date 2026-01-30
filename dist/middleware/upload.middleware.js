import multer from 'multer';
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
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
});
export default upload;
//# sourceMappingURL=upload.middleware.js.map