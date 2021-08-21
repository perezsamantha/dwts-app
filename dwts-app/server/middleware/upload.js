import multer from 'multer';
import { Storage } from '@google-cloud/storage';

// const storage = new Storage({
//     projectId: process.env.GCLOUD_PROJECT_ID,
//     keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
// });

// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg') || (file.mimetype).includes('png')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: 5 * 1024 * 1024,
});

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg') || (file.mimetype).includes('png')) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// let upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// });

export default upload.single('promoPic');