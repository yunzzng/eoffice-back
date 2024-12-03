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

// 회의실 단일 조회
const getMeetingRoom = async (id) => {
    try {
        return await MeetingRoom.findById(id); 
    } catch (err) {
        console.error("[getMeetingRoom] Error:", err);
    }
};

// 회의실 수정
const updateMeetingRoom = async (id, data) => {
    try {
        return await MeetingRoom.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        console.logr("[updateMeetingRoom] Error:", err);
    }
};

// 회의실 삭제
const deleteMeetingRoom = async (id) => {
    try{
        return await MeetingRoom.findByIdAndDelete(id);
    } catch (err) {
        console.logo("[deleteMeetingRoom] Error:", err);
    }
};

module.exports = {
    createMeetingRoom,
    getMeetingRoomList,
    getMeetingRoom,
    updateMeetingRoom,
    deleteMeetingRoom,
};