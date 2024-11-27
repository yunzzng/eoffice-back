const crypto = require('crypto');
const User = require('../../schemas/user.schema');
const { createUser, getUserByEmailAndPassword, updateUser } = require("../../services/user/user.service");

exports.signup = async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ isError: true, message: "이미 존재하는 이메일입니다." });
        }

        const hashedPassword = crypto.createHash("sha512").update(password).digest("base64");

        // 사용자 생성
        const createResult = await createUser({ email, name, password: hashedPassword });
        if (createResult) {
            return res.status(201).json({ isError: false, message: "회원가입 성공" });
        } else {
            return res.status(500).json({ isError: true, message: "사용자 생성 실패" });
        }
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ isError: true, message: "서버 오류" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("로그인 요청 데이터:", { email, password });

    if (!email || !password) {
        return res.status(400).json({ isError: true, message: "Email and password are required" });
    }

    try {
        const hashedPassword = crypto.createHash("sha512").update(password).digest("base64");
        console.log("암호화된 비밀번호:", hashedPassword);

        const user = await getUserByEmailAndPassword({ email, password: hashedPassword });
        console.log("DB에서 조회된 사용자:", user);

        if (!user) {
            return res.status(400).json({ isError: true, message: "User not found" });
        }
        return res.status(200).json({ isError: false, user });
    } catch (err) {
        console.error("로그인 중 에러:", err);
        return res.status(500).json({ isError: true, message: "(!) Fail to read user" });
    }
};