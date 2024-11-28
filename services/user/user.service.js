const User = require("../../schemas/user.schema");

const createUser = async  (userData) => {
    try{
        const document = await User.create(userData);
        console.log("MongoDB에 저장된 데이터:", document);
        return true;
    } catch (err){
        console.log('[createUser] Error :: ', err);
        return false;
    }
};

const getUserByEmailAndPassword = async (data) => {
    try{
        const user = await User.findOne({ ...data });
        if(!user){
            return null;
        }
        const {_id, email, name} = user;
        return  {_id, email, name};
    } catch (err){
        console.log(err);
        return false;
    }
}   

const updateUser = async (data) => {
    try {
        console.log("userData: ", data);
        const edit = await User.updateOne(
            { _id: data._id },               
            { 
                password: data.password,      
                profileImage: data.profileImage 
            },
        );
        return edit;
    } catch (err) {
        console.log('Error updating user:', err);
        return false;
    }
};

module.exports = {
    createUser, 
    getUserByEmailAndPassword,
    updateUser,
};