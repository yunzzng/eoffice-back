const { createMeetingRoom, getMeetingRoomList } = require("../../services/meeting/meeting.service");

// 회의실 등록
const addMeetingRoom = async (req, res) => {
    try {
        const { name, location, person } = req.body; 
        const updatedData = { name, location, person }; 
        
        if (req.file) {
            const fileName = req.file.filename; 
            updatedData.file = `/images/${fileName}`; 
            console.log("업로드된 파일: ", req.file);
        } else {
            console.log("파일 업로드 실패");
        }

        if (!name || !location || !person) {
            return res.status(400).json({ isError: true, message: "모든 필드를 입력해주세요." });
        }

        const newMeetingRoom = await createMeetingRoom(updatedData);

        return res.status(201).json({ isError: false, message: "회의실이 성공적으로 등록되었습니다.", meetingRoom: newMeetingRoom, });
    } catch (err) {
        return res.status(500).json({  isError: true, message: "서버 오류로 인해 회의실 등록을 완료하지 못했습니다.",});
    }
};

// 회의실 조회
const getMeetingRooms = async (req, res) => {
    try {
        const meetingRooms = await getMeetingRoomList();
        if (!meetingRooms || meetingRooms.length === 0) {
            return res.status(404).json({ isError: true, message: "등록된 회의실이 없습니다." });
        }
        return res.status(200).json({ isError: false, data: meetingRooms });
    } catch (err) {
        return res.status(500).json({ isError: true,message: "서버 오류로 인해 회의실 조회를 완료하지 못했습니다.",});
    }
};

module.exports = {
    addMeetingRoom,
    getMeetingRooms,
};