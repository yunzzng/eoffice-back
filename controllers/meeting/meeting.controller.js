const { createMeetingRoom, getMeetingRoomList, getMeetingRoom, updateMeetingRoom, deleteMeetingRoom  } = require("../../services/meeting/meeting.service");

// 회의실 등록
const addMeetingRoom = async (req, res) => {
    try {
        const { name, location, person } = req.body; 
        console.log("Validation Error: Missing fields", { name, location, person });
        const updatedData = { name, location,  person: Number(person) }; 
        
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
        console.log("[addMeetingRoom] Error:", err);
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
        return res.status(200).json({ isError: false, message:"저장된 회의실:", data: meetingRooms });
    } catch (err) {
        console.log("[getMeetingRooms] Error:", err);
        return res.status(500).json({ isError: true,message: "서버 오류로 인해 회의실 조회를 완료하지 못했습니다.",});
    }
};

// 회의실 단일 조회
const getMeetingRoomById = async (req, res) => {
    try {
        const { id } = req.params; 
        const meetingRoom = await getMeetingRoom(id); 

        if (!meetingRoom) {
            return res.status(404).json({ isError: true, message: "해당 회의실을 찾을 수 없습니다." });
        }
        return res.status(200).json({ isError: false, data: meetingRoom });
    } catch (err) {
        console.log("[getMeetingRoomById] Error:", err);
        return res.status(500).json({ isError: true, message: "서버 오류로 인해 데이터를 가져올 수 없습니다." });
    }
};

// 회의실 수정
const editMeetingRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, person } = req.body; 
        const updatedData = { name, location, person };

        if (req.file) {
            const fileName = req.file.filename; 
            updatedData.file = `/images/${fileName}`;
        }
        if (!name || !location || !person) {
            return res.status(400).json({ isError: true, message: "모든 필드를 입력해주세요." });
        }
        const updatedRoom = await updateMeetingRoom(id, updatedData);

        if (!updatedRoom) {
            return res.status(404).json({ isError: true, message: "해당 회의실을 찾을 수 없습니다." });
        }
        return res.status(200).json({  isError: false, message: "회의실 정보가 성공적으로 수정되었습니다.",  meetingRoom: updatedRoom });
    } catch (err) {
        console.log("[editMeetingRoom] Error:", err);
        return res.status(500).json({  isError: true, message: "서버 오류로 인해 회의실 수정을 완료하지 못했습니다."});
    }
};

// 회의실 삭제
const removeMeetingRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await deleteMeetingRoom(id);

        if (!deletedRoom) {
            return res.status(404).json({ isError: true, message: "해당 회의실을 찾을 수 없습니다." });
        }
        return res.status(200).json({  isError: false,  message: "회의실이 성공적으로 삭제되었습니다.",  meetingRoom: deletedRoom  });
    } catch (err) {
        console.log("[removeMeetingRoom] Error:", err);
        return res.status(500).json({  isError: true, message: "서버 오류로 인해 회의실 삭제를 완료하지 못했습니다."  });
    }
};

module.exports = {
    addMeetingRoom,
    getMeetingRooms,
    getMeetingRoomById,
    editMeetingRoom,
    removeMeetingRoom,
};