const {
    Reservation,
    MeetingRoom,
  } = require('../../schemas/reservation.schema');
  
  // 예약 생성
  const createReservation = async ({
    roomId,
    date,
    startTime,
    personCount,
    title,
  }) => {
    try {
      const meetingRoom = await MeetingRoom.findById(roomId).lean();
      if (!meetingRoom) {
        throw new Error('해당 회의실을 찾을 수 없습니다.');
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
        message: '예약이 성공적으로 생성되었습니다.',
        data: {
          reservation: savedReservation,
          meetingRoom: {
            name: meetingRoom.name,
            location: meetingRoom.location,
            file: meetingRoom.file,
          },
        },
      };
    } catch (err) {
      console.error('[createReservation] Error:', err);
      throw new Error('예약 생성에 실패했습니다.', { cause: err });
    }
  };
  
  // 특정 예약 조회
  const getReservationById = async (reservationId) => {
    try {
      const reservation = await Reservation.findById(reservationId)
        .populate('roomId', 'name location')
        .populate('userId', 'name email');
  
      if (!reservation) {
        throw new Error('해당 ID의 예약을 찾을 수 없습니다.');
      }
  
      return reservation;
    } catch (err) {
      console.error('[getReservationById] Error:', err);
      throw new Error('예약 조회에 실패했습니다.', { cause: err });
    }
  };
  
  module.exports = {
    createReservation,
    getReservationById,
  };