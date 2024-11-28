require("./db_init"); 
const express = require("express");
// const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const oauthRoutes = require("./routes/oauth.routes");
const meetingRoutes = require('./routes/minutes.routes'); 

const app = express();

// 미들웨어
// app.use(cors({
//     origin: "http://localhost:5173"
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터
app.use("/api/user", userRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/meeting", meetingRoutes);

// http://localhost:8080/api/oauth/google

module.exports = app;