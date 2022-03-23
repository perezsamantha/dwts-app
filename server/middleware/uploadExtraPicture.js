import multer from 'multer';

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg') || (file.mimetype).includes('png')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let uploadExtraPicture = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: 5 * 1024 * 1024,
});

export default uploadExtraPicture.single("pictures");