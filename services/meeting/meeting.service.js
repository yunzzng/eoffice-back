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
    throw new Error('회의실 목록 조회에 실패했습니다.', { cause: err });
  }
};

// 회의실 단일 조회
const getMeetingRoom = async (id) => {
  try {
    const meetingRoom = await MeetingRoom.findById(id).lean();
    if (!meetingRoom) {
      throw new Error('해당 ID의 회의실이 존재하지 않습니다.');
    }
    return meetingRoom;
  } catch (err) {
    console.error('[getMeetingRoom] Error:', err);
    throw new Error('회의실 조회에 실패했습니다.', { cause: err });
  }
};

// 회의실 수정
const updateMeetingRoom = async (id, data) => {
  try {
    const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
    if (!updatedMeetingRoom) {
      throw new Error('해당 ID의 회의실을 찾을 수 없습니다.');
    }
    return updatedMeetingRoom;
  } catch (err) {
    console.error('[updateMeetingRoom] Error:', err);
    throw new Error('회의실 수정에 실패했습니다.', { cause: err });
  }
};

// 회의실 삭제
const deleteMeetingRoom = async (id) => {
  try {
    const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(id).lean();
    if (!deletedMeetingRoom) {
      throw new Error('해당 ID의 회의실을 찾을 수 없습니다.');
    }
    return deletedMeetingRoom;
  } catch (err) {
    console.error('[deleteMeetingRoom] Error:', err);
    throw new Error('회의실 삭제에 실패했습니다.', { cause: err });
  }
};

module.exports = {
  createMeetingRoom,
  getMeetingRoomList,
  getMeetingRoom,
  updateMeetingRoom,
  deleteMeetingRoom,
};