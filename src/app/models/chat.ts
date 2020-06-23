import mongoose from 'mongoose'

const ChatModel = new mongoose.Schema({
    chatId: String,
    from: String,
    to: String,
    content: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    read: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Chat', ChatModel)
