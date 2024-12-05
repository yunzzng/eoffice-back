const Minutes = require('../../schemas/minutes.schema');
const moment = require('moment');

// 회의록 생성
const createMinutes = async (data) => {
  try {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const MinutesData = {...data, createdAt: date};
    const document = await Minutes.create(MinutesData);
    return document.toObject();
  } catch (err) {
    console.error('[createMinutes] Error:', err);
    throw new Error('회의록 생성에 실패했습니다.', { cause: err });
  }
};

// 회의록 목록 조회
const getMinutes = async () => {
  try {
    const minutes = await Minutes.find().lean();
    return minutes;
  } catch (err) {
    console.error('[getMinutes] Error:', err);
    throw new Error('회의록 목록 조회에 실패했습니다.', { cause: err });
  }
};

module.exports = {
  createMinutes,
  getMinutes,
};