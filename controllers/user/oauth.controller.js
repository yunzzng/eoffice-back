const axios = require('axios');
const {
  createUser,
  getUserByEmail,
} = require('../../services/user/user.service');
const jwt = require('jsonwebtoken');
const {
  googleClientId,
  googleClientSecret,
  googleOauthRedirectUrl,
  kakaoApiKey,
  kakaoOauthRedirectUrl,
} = require('../../firebaseConfig');

const googleOauth = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleOauthRedirectUrl}&response_type=code&scope=email profile`;
  res.redirect(googleAuthUrl);
};

// redirect uri => front의 login page 또는 로딩 페이지
// OAuthLoadingComponent => GET '/api/oauth/google-redirect' => server는 google로부터 받은 code를 이용하여 access token을 받아옴
// ### 아래부터는 구현이 되어있음
// access token을 사용해서 google user info를 받아옴
// 받아온 user info를 이용하여 로그인 또는 회원가입 로직을 수행
// 로그인 또는 회원가입이 성공하면 front에게 JWT 토큰을 발급.

const googleOauthRedirect = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect(`${process.env.FRONT_END_URL}?login=failure`);
    }
    const googleTokenUrl = 'https://oauth2.googleapis.com/token';
    const data = {
      code: code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleOauthRedirectUrl,
      grant_type: 'authorization_code',
    };

    const tokenResponse = await axios.post(googleTokenUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(400).json({
        isError: true,
        message: 'Access Token을 받아오지 못했습니다.',
      });
    }
    const googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const googleUserInfoResponse = await axios.get(googleUserInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // 여기서 Google로부터 받아온 유저 정보를 이용하여 로그인 또는 회원가입 로직을 수행합니다.
    const user = await getUserByEmail(googleUserInfoResponse.data.email);

    // 회원 가입
    if (!user) {
      const newUser = await createUser({
        // 구글에서 가져온 값으로 변경해주세요.
        email: googleUserInfoResponse.data.email,
        name: googleUserInfoResponse.data.name,
        password: '',
        provider: 'google',
      });

      // JWT 생성
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // 토큰 유효 기간 설정 (1시간)
      );
      return res.json({
        isError: false,
        user: { id: user._id, email: user.email, name: user.name },
        token,
        message: '로그인에 성공하였습니다.',
      });
    }

    // JWT 생성
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // 토큰 유효 기간 설정 (1시간)
    );
    return res.json({
      isError: false,
      user: { id: user._id, email: user.email, name: user.name },
      token,
      message: '로그인에 성공하였습니다.',
    });
  } catch (err) {
    console.error('[googleOauthRedirect] Error:', err);
    res
      .status(500)
      .json({ isError: true, message: '서버에 문제가 발생하였습니다.' });
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

    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const data = new URLSearchParams({
      code: code,
      client_id: kakaoApiKey,
      redirect_uri: kakaoOauthRedirectUrl,
      grant_type: 'authorization_code',
    }).toString();

    const tokenResponse = await axios.post(kakaoTokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token } = tokenResponse.data;
    console.log('Access Token Response:', tokenResponse.data);

    if (access_token) {
      const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
      const kakaoUserInfoResponse = await axios.get(kakaoUserInfoUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log('User Info:', kakaoUserInfoResponse.data);
      return res.redirect(`http://localhost:5173/home`);
    }
    return res.redirect(`http://localhost:5173/login`);
  } catch (err) {
    console.log('[kakaoOauthRedirect] Error:', err);
    return res.redirect(`http://localhost:5173/login`);
  }
};

module.exports = {
  googleOauth,
  googleOauthRedirect,
  kakaoOauth,
  kakaoOauthRedirect,
};
