const { Reservation, MeetingRoom } = require("../schemas/meeting.schema");

const addReservation = async (req, res) => {
    try {
        const { roomId, date, startTime, personCount, title } = req.body;

        if (!roomId || !userName || !date || !startTime || !endTime || !personCount || !title) {
            return res.status(400).json({ isError: true, message: "모든 필드를 입력해주세요." });
        }

        // 회의실 정보 가져오기
        const meetingRoom = await MeetingRoom.findById.populate(roomId);
        if (!meetingRoom) {
            return res.status(404).json({ isError: true, message: "해당 회의실을 찾을 수 없습니다." });
        }

        const newReservation = new Reservation({
            roomId,
            date,
            startTime,
            personCount,
            title,
        });

        const savedReservation = await newReservation.save();

        return res.status(201).json({
            isError: false,
            message: "예약이 성공적으로 생성되었습니다.",
            data: {
                reservation: savedReservation,
                meetingRoom: {
                    name: meetingRoom.name,
                    location: meetingRoom.location,
                    file: meetingRoom.file,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({ isError: true, message: "서버 오류로 인해 예약 생성에 실패했습니다.",});
    }
};

module.exports = { addReservation };