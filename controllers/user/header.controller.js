const jwt = require('jsonwebtoken');
const User = require('../../schemas/user.schema');

const getProfile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // JWT 토큰 추출
    if (!token) {
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        res.json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

module.exports = { getProfile };