import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    repassword:String,
    userType:String,
    avatar:String,
    desc:String,
    money:String,
    title:String,
    company:String
})

export default mongoose.model('User',UserSchema);
