const MeetingRoom = require('../../schemas/meeting.schema');

// 회의실 생성
const createMeetingRoom = async (data) => {
  try {
    const meetingRoom = await MeetingRoom.create(data);
    return meetingRoom;
  } catch (err) {
    console.error('[createMeetingRoom] Error:', err);
    throw new Error('회의실 생성에 실패했습니다.', { cause: err });
  }
};

// 회의실 목록 조회
const getMeetingRoomList = async () => {
  try {
    const meetingRooms = await MeetingRoom.find().lean();
    return meetingRooms;
  } catch (err) {
    console.error('[getMeetingRoomList] Error:', err);
    throw new Error('회의실 가져오기를 실패했습니다.', { cause: err }); // 나머지도 작성해주세요.
  }
};

// 회의실 단일 조회
const getMeetingRoom = async (id) => {
  try {
    return await MeetingRoom.findById(id).lean();
  } catch (err) {
    console.error('[getMeetingRoom] Error:', err);
  }
};

// 회의실 수정
const updateMeetingRoom = async (id, data) => {
  try {
    return await MeetingRoom.findByIdAndUpdate(id, data, { new: true }).lean();
  } catch (err) {
    console.error('[updateMeetingRoom] Error:', err);
  }
};

// 회의실 삭제
const deleteMeetingRoom = async (id) => {
  try {
    return await MeetingRoom.findByIdAndDelete(id).lean();
  } catch (err) {
    console.error('[deleteMeetingRoom] Error:', err);
  }
};

module.exports = {
  createMeetingRoom,
  getMeetingRoomList,
  getMeetingRoom,
  updateMeetingRoom,
  deleteMeetingRoom,
};
