const { createMinutes } = require("../../services/meeting/minutes.service");

exports.createMinutes = async (req, res) => {
    const { title, date, attendees, content } = req.body;

    if (!title || !date || !attendees || !content) {
        return res.status(400).json({ message: "필수 입력 항목이 모두 채워져야 합니다." });
    }

    try {
        const newMinutes = await createMinutes({ title, date, attendees, content });
        return res.status(201).json({ message: "회의록이 성공적으로 저장되었습니다.", minutes: newMinutes });
    } catch (err) {
        console.log("회의록 저장 중 오류 발생:", err);
        return res.status(500).json({ message: "회의록 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." });
    }
};