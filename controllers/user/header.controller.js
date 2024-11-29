const User = require('../../schemas/user.schema');

const getProfile = async (req, res) => {
    try {
        console.log("req.user in getProfile:", req.user);
        const userId = req.user.id; 
        const user = await User.findById(userId); 

        if (!user) { 
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        return res.status(200).json({
            message: '유저 정보를 성공적으로 가져왔습니다.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err); 
        return res.status(500).json({ message: '서버 오류가 발생했습니다.', err }); 
    }
};

module.exports = getProfile;