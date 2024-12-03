const { Reservation, MeetingRoom } = require("../../schemas/reservation.schema");

const createReservation = async (data) => {
    const { roomId, date, startTime, personCount, title } = data;

    const meetingRoom = await MeetingRoom.findById(roomId);
    if (!meetingRoom) {
        return {
            isError: true,
            message: "해당 회의실을 찾을 수 없습니다.",
        };
    }

    const newReservation = new Reservation({
        roomId,
        date,
        startTime,
        personCount,
        title,
    });

    // 데이터베이스에 저장
    const savedReservation = await newReservation.save();

    return {
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
    };
};

// 특정 예약 조회
const getReservationById = async (reservationId) => {
    return await Reservation.findById(reservationId)
        .populate("roomId", "name location")
        .populate("userId", "name email");
};

module.exports = {
    createReservation ,
    getReservationById,
};