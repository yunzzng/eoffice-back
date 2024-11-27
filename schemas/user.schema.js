const mongoose = require('../db_init');
const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
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
    profileImage: { 
        type: String,
    },
  }, {
    timestamps: {
        createdAt: true,
    },
  });

const User = mongoose.model("users", userSchema);
module.exports = User;

