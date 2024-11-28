const axios = require("axios");

const { googleClientId, googleClientSecret, googleOauthRedirectUrl, kakaoApiKey, kakaoOauthRedirectUrl } = require("../../firebaseConfig");

const googleOauth = (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleOauthRedirectUrl}&response_type=code&scope=email profile`;
    console.log("Google Auth URL:", googleAuthUrl);
    res.redirect(googleAuthUrl);
};

const googleOauthRedirect = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.redirect(`http://localhost:5173?login=failure`);
        }
        const googleTokenUrl = "https://oauth2.googleapis.com/token";
        const data = {
            code: code,
            client_id: googleClientId,
            client_secret: googleClientSecret,
            redirect_uri: googleOauthRedirectUrl,
            grant_type: "authorization_code",
        };

        const tokenResponse = await axios.post(googleTokenUrl, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { access_token } = tokenResponse.data;
        console.log("Access Token Response:", tokenResponse.data);

        if (access_token) {
            const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
            const googleUserInfoResponse = await axios.get(googleUserInfoUrl, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            console.log("User Info:", googleUserInfoResponse.data);
            return res.redirect(`http://localhost:5173/home`);
        }
        return res.redirect(`http://localhost:5173/login`);
    } catch (err) {
        return res.redirect(`http://localhost:5173/login`);
    }
};

const kakaoOauth = (req, res) => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoApiKey}&redirect_uri=${kakaoOauthRedirectUrl}&scope=profile_nickname,profile_image`;
    res.redirect(kakaoAuthUrl);
};

const kakaoOauthRedirect = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.redirect(`http://localhost:5173?login=failure`);
        }

        const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
        const data = new URLSearchParams({
            code: code,
            client_id: kakaoApiKey,
            redirect_uri: kakaoOauthRedirectUrl,
            grant_type: "authorization_code",
        }).toString();

        const tokenResponse = await axios.post(kakaoTokenUrl, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { access_token } = tokenResponse.data;
        console.log("Access Token Response:", tokenResponse.data);

        if (access_token) {
            const kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
            const kakaoUserInfoResponse = await axios.get(kakaoUserInfoUrl, {
                headers: {
                    Authorization: `Bearer ${access_token}`, 
                },
            });
            console.log("User Info:", kakaoUserInfoResponse.data);
            return res.redirect(`http://localhost:5173/home`);
        }
        return res.redirect(`http://localhost:5173/login`);
    } catch (err) {
        return res.redirect(`http://localhost:5173/login`);
    }
};

module.exports = {
    googleOauth,
    googleOauthRedirect,
    kakaoOauth,
    kakaoOauthRedirect,
};