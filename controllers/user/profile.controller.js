const { updateUser } = require("../../services/user/user.service");
const User = require("../../schemas/user.schema");

exports.updateProfile = async (req, res) => {
    try {
        const { _id, password } = req.body;
        const updatedData = {};

        // 프로필 이미지가 업로드된 경우
        if (req.file) {
            const fileName = req.file.filename;
            updatedData.profileImage = `http://localhost:8080/images/${fileName}`;
        }

        // 비밀번호 변경 요청이 있는 경우
        if (password) updatedData.password = password;

        updatedData._id = _id; 
        const updateSuccess = await updateUser(updatedData);

        if (updateSuccess) {
            const updatedUser = await User.findById(_id, { password: 0 });

            return res.status(200).json({
                isError: false,
                message: "프로필이 성공적으로 업데이트되었습니다.",
                user: updatedUser.toObject(),
            });
        } else {
            return res.status(400).json({
                isError: true,
                message: "프로필 업데이트에 실패하였습니다. 변경된 내용이 없습니다.",
            });
        }
    } catch (err) {
        console.error("프로필 업데이트 중 오류 발생:", err);
        return res.status(500).json({
            isError: true,
            message: "서버 오류로 인해 프로필 업데이트를 완료하지 못했습니다.",
        });
    }
};