require('dotenv').config();

const googleApiKey = process.env.GOOGLE_API_KEY;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleOauthRedirectUrl = process.env.GOOGLE_CLIENT_REDIRECT_URL;

const kakaoApiKey = process.env.KAKAO_API_KEY
const kakaoOauthRedirectUrl = process.env.KAKAO_CLIENT_REDIRECT_URL 

module.exports = {
    googleApiKey,
    googleClientId,
    googleClientSecret,
    googleOauthRedirectUrl, 
    kakaoApiKey,
    kakaoOauthRedirectUrl,
}