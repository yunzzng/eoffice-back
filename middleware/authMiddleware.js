const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ isError: true, message: '인증 토큰이 없습니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT 인증 실패:', err);
    return res
      .status(401)
      .json({ isError: true, message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = jwtMiddleware;
