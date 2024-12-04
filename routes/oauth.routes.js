const express = require("express");
const router = express.Router();
const { googleOauth, googleOauthRedirect  } = require("../controllers/user/oauth.controller");

router.get("/google", googleOauth);                     // /api/oauth/google
router.get("/google-redirect", googleOauthRedirect);    // /api/oauth/google-redirect

module.exports = router;