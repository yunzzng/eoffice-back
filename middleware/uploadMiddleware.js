const multer = require("multer");
const path = require("path");

// Multer 설정
const uploadMiddleware = multer({
    storage: multer.diskStorage({
        filename: (req, file, done) => {
            // 어떤 파일 이름으로 저장할건지
            const fileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
            return done(null, `${new Date().getTime()}-${fileName}`);
        },
        destination: (req, file, done) => {
            // 어디에 파일을 저장할건지
            const rootPath = process.cwd(); // Current Working Directory
            return done(null, path.join(rootPath, "public", "images"));
        },
    }),
});


module.exports = uploadMiddleware;