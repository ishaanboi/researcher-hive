const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { uploadResearch } = require('../controllers/researchController');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('file'), uploadResearch);

module.exports = router;
