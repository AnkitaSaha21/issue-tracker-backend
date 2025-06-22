// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// store uploaded files in 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  // optional: restrict file types
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
