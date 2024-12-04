const { getUserById, updateUser } = require('../../services/user/user.service');
const crypto = require('crypto');

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;
    const updatedData = {};

    // 프로필 이미지가 업로드된 경우
    if (req.file) {
      const fileName = req.file.filename;
      updatedData.profileImage = `/images/${fileName}`;
    }

    // 비밀번호 변경 요청이 있는 경우
    if (password) {
      const hashedPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('base64');
      updatedData.password = hashedPassword;
    }

    // 사용자 정보 업데이트
    const updateSuccess = await updateUser({ userId, updatedData });

    if (!updateSuccess) {
      return res.status(400).json({
        isError: true,
        message: '프로필 업데이트에 실패하였습니다. 변경된 내용이 없습니다.',
      });
    }

    return res.status(200).json({
      isError: false,
      message: '프로필이 성공적으로 업데이트되었습니다.',
    });
  } catch (err) {
    console.error('[updateProfile] Error:', err);
    return res.status(500).json({
      isError: true,
      message: '서버 오류로 인해 프로필 업데이트를 완료하지 못했습니다.',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // 사용자 정보 가져오기
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        isError: true,
        message: '사용자 정보를 찾을 수 없습니다.',
      });
    }

    return res.status(200).json({
      isError: false,
      message: '사용자 프로필 정보가 성공적으로 조회되었습니다.',
      user,
    });
  } catch (err) {
    console.error('[getProfile] Error:', err);
    return res.status(500).json({
      isError: true,
      message: '서버 오류로 인해 프로필 정보를 가져오지 못했습니다.',
    });
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
