const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserByEmail,
  getUserByEmailAndPassword,
} = require('../../services/user/user.service');

const signup = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ isError: true, message: '이미 등록된 이메일입니다.' });
    }

    const hashedPassword = crypto
      .createHash('sha512')
      .update(password)
      .digest('base64');

    // 사용자 생성
    const newUser = await createUser({ email, name, provider:'email', password: hashedPassword });

    if (newUser) {
      return res.status(201).json({
        isError: false,
        message: '회원가입이 성공적으로 완료되었습니다.',
      });
    }
    return res
      .status(500)
      .json({ isError: true, message: '사용자 생성에 실패하였습니다.' });
  } catch (err) {
    console.error('[signup] Error:', err);
    return res
      .status(500)
      .json({ isError: true, message: '서버에 문제가 발생하였습니다.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      isError: true,
      message: '이메일과 비밀번호를 모두 입력해주세요.',
    });
  }

  try {
    const hashedPassword = crypto
      .createHash('sha512')
      .update(password)
      .digest('base64');

    const user = await getUserByEmailAndPassword({
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res
        .status(400)
        .json({ isError: true, message: '사용자를 찾을 수 없습니다.' });
    }

    // JWT 생성
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // 토큰 유효 기간 설정 (1시간)
    );

    return res.status(200).json({
      isError: false,
      user: { id: user._id, email: user.email, name: user.name },
      token,
      message: '로그인에 성공하였습니다.',
    });
  } catch (err) {
    console.error('[login] Error:', err);
    return res
      .status(500)
      .json({ isError: true, message: '서버에 문제가 발생하였습니다.' });
  }
};

module.exports = {
  signup,
  login,
};
