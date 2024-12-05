const  Reservation  = require('../../schemas/reservation.schema');
const moment = require('moment');
  
  // 예약 생성
  const createReservation = async (data) => {
    try {
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      const reservationData = { ...data, createdAt };
      const newReservation = await Reservation.create(reservationData);
      return newReservation.toObject();
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