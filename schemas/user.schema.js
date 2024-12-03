const mongoose = require('../db_init');
const { String } = mongoose.Schema.Types;


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ['email', 'google', 'kakao'],
      required: true,
    },
    profileImage: {
      type: String,
      default: "/default_img/default_img/blank-profile.png", // 여기가 default 이미지 URL
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);
module.exports = User;
