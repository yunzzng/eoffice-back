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
      required: function () {
        return this.provider === 'email'; // provider가 'email'일 경우에만 필수
      },
    },
    provider: {
      type: String,
      enum: ['email', 'google', 'kakao'],
      required: true,
    },
    profileImage: {
      type: String,
      profileImage: "/default_img/default_img/blank-profile.png", // 여기가 default 이미지 URL
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);
module.exports = User;
