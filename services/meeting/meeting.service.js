const MeetingRoom = require("../../schemas/meeting.schema");

// 회의실 생성
const createMeetingRoom = async (data) => {
  try {
        const meetingRoom = await MeetingRoom.create(data);
        console.log("회의실 저장 성공:", meetingRoom);
        return meetingRoom;
    } catch (err) {
        console.log("[createMeetingRoom] Error:", err);
    }
};

// 회의실 목록 조회
const getMeetingRoomList = async () => {
    try {
        const meetingRooms = await MeetingRoom.find();
        return meetingRooms;
    } catch (err) {
        console.logr("[getMeetingRoomList] Error:", err);
    }
};

module.exports = {
    createMeetingRoom,
    getMeetingRoomList,
}; 