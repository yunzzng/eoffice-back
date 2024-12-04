const User = require('../../schemas/user.schema');

const createUser = async (userData) => {
  try {
    const document = await User.create(userData);
    return document.toObject();
  } catch (err) {
    console.error('[createUser] Error :: ', err);
    // 에러 던지기
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).lean();
    return user;
  } catch (err) {
    console.error(err);
    // 에러 던지기
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();
    return user;
  } catch (err) {
    console.error(err);
    // 에러 던지기
  }
};

const getUserByEmailAndPassword = async (data) => {
  // 구조 분해 표현식으로 바꿔서 어떤 속성을 갖는 객체를 매개변수로 받는지 명확하게 표현해주자.
  try {
    const user = await User.findOne({ ...data }).lean();
    if (!user) {
      return null;
    }
    const { _id, email, name } = user;
    return { _id, email, name };
  } catch (err) {
    console.error(err);
    // 에러 던지기
  }
};

const updateUser = async ({ userId, updatedData: data }) => {
  try {
    const updateResult = await User.updateOne(
      { _id: userId },
      {
        password: data.password,
        profileImage: data.profileImage,
      }
    );
    return updateResult;
  } catch (err) {
    console.error('Error updating user:', err); // 에러 로깅 스타일도 통일해주자.
    // 에러 던지기
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword,
  updateUser,
};
