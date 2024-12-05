const { getMeetingRoom } = require('../../services/meeting/meeting.service');
const {
  getReservationById,
  createReservation,
} = require('../../services/meeting/reservation.service');

const addReservation = async (req, res) => {
  try {
    const { roomId, date, startTime, participants, title } = req.body;
    const userId = req.user.id;

    console.log(req.body)
    if (!roomId || !date || !startTime || !participants || !title) {
      return res
        .status(400)
        .json({ isError: true, message: '모든 필드를 입력해주세요.' });
    }

    // 회의실 정보 가져오기
    const meetingRoom = await getMeetingRoom(roomId);
    if (!meetingRoom) {
      return res
        .status(404)
        .json({ isError: true, message: '해당 회의실을 찾을 수 없습니다.' });
    }

    const newReservation = await createReservation({roomId, userId, date, startTime, participants, title, });

    return res.status(201).json({
      isError: false,
      message: '예약이 성공적으로 생성되었습니다.',
      data: {
        reservation: newReservation,
      },
    });
  } catch (err) {
    console.error('[addReservation] Error:', err);
    return res.status(500).json({
      isError: true,
      message: '서버 오류로 인해 예약 생성에 실패했습니다.',
    });
  }
};

// 특정 예약 조회
const getReservationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);

    if (!reservation) {
      return res.status(404).json({
        isError: true,
        message: '해당 예약을 찾을 수 없습니다.',
        data: null,
      });
    }
    return res.status(200).json({
      isError: false,
      message: '예약 정보가 성공적으로 조회되었습니다.',
      data: reservation,
    });
  } catch (err) {
    console.error('[getReservationDetails] Error:', err);
    return res.status(500).json({
      isError: true,
      message: '서버 오류로 인해 예약 조회에 실패했습니다.',
    });
  }
};

module.exports = {
  addReservation,
  getReservationDetails,
};
