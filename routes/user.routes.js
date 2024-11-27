const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { signup, login, updateProfile } = require('../controllers/user/login.controller');

// const uploadMiddleware = multer({
//     storage: multer.diskStorage({
//         filename: (req, file, done) => {
//             const fileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
//             done(null, `${new Date().getTime()}-${fileName}`);
//         },
//         destination: (req, file, done) => {
//             const rootPath = process.cwd();
//             done(null, path.join(rootPath, "public", "images"));
//         },
//     }),
// });

router.post('/login', login);                                         // /api/user/login
router.post('/signup', signup);                                       // /api/user/signup
// router.put('/update', upload.single('profileImage'), updateProfile);  // /api/user/update

module.exports = router;