const User = require('../../schemas/user.schema');

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        res.json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

module.exports = getProfile;