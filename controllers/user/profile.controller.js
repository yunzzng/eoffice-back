const { updateUser } = require("../../services/user/user.service");
const crypto = require("crypto");

exports.updateProfile = async (req, res) => {
    try {
        const { _id, password } = req.body; // 요청 데이터
        const updatedData = {};

        if (req.file) {
            const fileName = req.file.filename;
            const imgUrl = `http://localhost:8080/images/${fileName}`; 
            updatedData.profileImage = imgUrl; 
        }

        if (password) updatedData.password = password;

        const updatedUser = await User.updateOne({ _id }, { $set: updatedData });

        if (updatedUser.modifiedCount > 0) {
            const updatedUserData = await User.findById(_id, {
                password: 0, 
            });

            return res.status(200).json({
                isError: false,
                message: "프로필 업데이트 성공",
                user: updatedUserData.toObject(), 
            });
        } else {
            return res.status(400).json({
                isError: true,
                message: "프로필 업데이트 실패: 변경 사항 없음",
            });
        }
    } catch (err) {
        console.log("Error updating profile:", err);
        return res.status(500).json({
            isError: true,
            message: "서버 오류로 인해 프로필 업데이트 실패",
        });
    }
};