const express = require("express");
const router = express.Router();
const { googleOauth, googleOauthRedirect, kakaoOauth, kakaoOauthRedirect,  } = require("../controllers/user/oauth.controller");
const  jwtMiddleware = require("../middleware/authMiddleware"); 

router.get("/google", googleOauth);                     // /api/oauth/google
router.get("/google-redirect", googleOauthRedirect);    // /api/oauth/google-redirect

router.get("/kakao", kakaoOauth);                       // /api/oauth/kakao
router.get("/kakao-redirect", kakaoOauthRedirect);      // /api/oauth/kakao-redirect


module.exports = router;