require("./db_init"); 
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const oauthRoutes = require("./routes/oauth.routes");
const minutesRoutes = require('./routes/minutes.routes'); 
const meetingRoutes = require('./routes/meeting.routes'); 
const reservationsRouter = require('./routes/reservation.routes');

const app = express();

// 미들웨어
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images",express.static("images"));
app.use("/default_img",express.static("public"));

// 라우터
app.use("/api/user", userRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/meeting/minutes", minutesRoutes);
app.use("/api/meeting/meetingrooms", meetingRoutes);
app.use('/api/reservations', reservationsRouter);

// http://localhost:8080/api/oauth/google

module.exports = app;