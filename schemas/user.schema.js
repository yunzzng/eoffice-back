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
        return this.provider === 'email'; 
      },
    },
    provider: {
      type: String,
      enum: ['email', 'google'],
      // required: true,
    },
    profileImage: {
      type: String,
      default: '/default_img/default_img/blank-profile.png', // 여기가 default 이미지 URL
    },
    createdAt: { type: String, default: Date.now },
  },
);

const User = mongoose.model('users', userSchema);
module.exports = User;
