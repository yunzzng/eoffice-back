const { createMinutes, getMinutes } = require("../../services/meeting/minutes.service");

const writeMinutes = async (req, res) => {
    const { title, date, attendees, content } = req.body;
    const userId = req.user.id; 

    if (!title || !date || !attendees || !content) {
        return res.status(400).json({ isError: true, message: "모든 필드를 입력해주세요."});
      }

    try {
        const newMinutes = await createMinutes({ title, date, attendees, content, createdBy: userId });
        return res.status(201).json({ message: "회의록이 성공적으로 저장되었습니다.", minutes: newMinutes });

    } catch (err) {
        console.log("[writeMinutes] Error:", err);
        return res.status(500).json({ message: "회의록 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." });
    }
};

const readMinutes = async (req, res) => {
    try {
        const minutes = await getMinutes();
        if (minutes.length === 0) {
            return res.status(404).json({ isError: true, message: "회의록이 없습니다.",});
        }
        console.log(minutes);
        return res.status(200).json({ isError: false, message: "저장된 회의록:", data: minutes,});
    } catch (err) {
        console.log("[readMinutes] Error:", err);
        return res.status(500).json({ isError: true, message: "회의록 조회 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",  });
    };
};


module.exports = {
    writeMinutes,
    readMinutes,
};