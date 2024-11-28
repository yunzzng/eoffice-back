const express = require("express");
const multer = require("multer");
const path = require("path");
const { signup, login } = require("../controllers/user/login.controller");
const { updateProfile } = require("../controllers/user/profile.controller");
const { getProfile } = require('../controllers/user/header.controller');

const router = express.Router();

// Multer 설정
const uploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, res, done) => {
            const rootPath = process.cwd();
            done(null, path.join(rootPath, "public", "images"));
        },
        filename: (req, res, done) => {
            const fileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
            done(null, `${new Date().getTime()}-${fileName}`);
        },
    }),
});


// 라우터 정의
router.post("/login", login); // /api/user/login
router.post("/signup", signup); // /api/user/signup
router.post("/update", uploadMiddleware.single("profileImage"), updateProfile); // /api/user/update
router.get('/profile', getProfile); // /api/user/profile

module.exports = router;