const Minutes = require('../../schemas/minutes.schema');

const createMinutes = async (data) => {
  try {
    const document = await Minutes.create(data);
    return document.toObject();
  } catch (err) {
    console.error('[createMinutes] Error:', err);
    // 에러 던지기
  }
};

const getMinutes = async () => {
  try {
    const minutes = await Minutes.find().lean();
    return minutes;
  } catch (err) {
    console.error('[getMinutes] Error:', err);
    // 에러 던지기
  }
};

module.exports = {
  createMinutes,
  getMinutes,
};
