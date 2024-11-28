const Minutes = require("../../schemas/minutes.schema");

const createMinutes = async (data) => {
    try {
        const document = await Minutes.create(data); 
        console.log("MongoDB에 저장된 데이터:", document);
        return document;
    } catch (err) {
        console.log("[createMinutes] Error:", err);
        return false;
    }
};

const getMinutes = async () => {
    try {
        const minutes = await Minutes.find(); 
        return minutes;
    } catch (err) {
        console.log("[getMinutes] Error:", err);
        return false;
    }
};

module.exports = {
    createMinutes,
    getMinutes,
};