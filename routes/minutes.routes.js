const express = require("express");
const router = express.Router();
const { createMinutes, getMinutes } = require("../controllers/meeting/minutes.controller");

// /api/meeting/minutes
router.post("/minutes", async (req, res) => {
  const data = req.body;
  const result = await createMinutes(data);
  if (result) {
    res.status(201).json({ success: true, message: "회의록이 저장되었습니다.", data: result });
  } else {
    res.status(500).json({ success: false, message: "회의록 저장 중 문제가 발생했습니다." });
  }
});

// /api/meeting/minuteslist
router.get("/minuteslist", async (req, res) => {
  const minutes = await getMinutes();
  if (minutes) {
    res.status(200).json({ success: true, data: minutes });
  } else {
    res.status(500).json({ success: false, message: "회의록을 가져오는 중 문제가 발생했습니다." });
  }
});

module.exports = router;


