const User = require('../../schemas/user.schema');

// 사용자 생성
const createUser = async (userData) => {
  try {
    // provider 기본값 추가
    if (!userData.provider) {
      userData.provider = 'email'; 
    }

    const document = await User.create(userData);
    return document.toObject();
    
  } catch (err) {
    console.error('[createUser] Error:', err);
    throw new Error('사용자 생성에 실패했습니다.', { cause: err }); 
  }
};

// ID로 사용자 조회
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).lean();
    if (!user) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    return user;
  } catch (err) {
    console.error('[getUserById] Error:', err); 
    throw new Error('사용자 조회에 실패했습니다.', { cause: err });
  }
};

// 이메일로 사용자 조회
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return user || null; 
    }
    return user;
  } catch (err) {
    console.error('[getUserByEmail] Error:', err); 
    throw new Error('이메일로 사용자 조회에 실패했습니다.', { cause: err }); 
  }
};

// 이메일과 비밀번호로 사용자 조회
const getUserByEmailAndPassword = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, password }).lean(); 
    if (!user) {
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
    }
    const { _id, email: userEmail, name } = user; 
    return { _id, email: userEmail, name };
  } catch (err) {
    console.error('[getUserByEmailAndPassword] Error:', err); 
    throw new Error('사용자 인증에 실패했습니다.', { cause: err }); 
  }
};

// 사용자 정보 업데이트
const updateUser = async ({ userId, updatedData:data }) => {
  try {
    const updateResult = await User.updateOne(
      { _id:userId },
      {
        password: data.password,
        profileImage: data.profileImage,
      }
    );
    if (updateResult.matchedCount === 0) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    return updateResult;
  } catch (err) {
    console.error('[updateUser] Error:', err); 
    throw new Error('사용자 업데이트에 실패했습니다.', { cause: err }); 
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword,
  updateUser,
};