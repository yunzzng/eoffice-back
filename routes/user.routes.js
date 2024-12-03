const express = require("express");
const { signup, login } = require("../controllers/user/login.controller");
const { updateProfile, getProfile } = require("../controllers/user/profile.controller");
const userProfile = require('../controllers/user/header.controller');
const jwtMiddleware = require("../middleware/authMiddleware"); 
const uploadMiddleware = require('../middleware/uploadMiddleware'); 

const router = express.Router();


// 라우터 정의
router.post("/login", login); // /api/user/login
router.post("/signup", signup); // /api/user/signup
router.put("/update", jwtMiddleware, uploadMiddleware.single("profileImage"), updateProfile ); // /api/user/update
router.get('/profile', jwtMiddleware, getProfile); // /api/user/profile

// header
router.get("/userprofile", jwtMiddleware, userProfile); // /api/user/userprofile

module.exports = router;