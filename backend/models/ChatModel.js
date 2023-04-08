const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    jobCreatorID:{
        type: String,
        required: true
    },
    workerID:{
        type: String,
        required: true
    },
    messages:{
        type: Array,
        required: true
    }
    

}, {timestamps: true})

chatSchema.statics.createChat = async function(req){
    const {workerID} = req.body
    const jobCreatorID = req.account._id
    let emptyFields = []
    if(!workerID) emptyFields.push('workerID')
    if(!jobCreatorID) emptyFields.push('jobCreatorId')
    if(emptyFields.length > 0){
        throw Error("Please fill in all fields", emptyFields)
    }
    try{
        const chat = await this.create({jobCreatorID, workerID, messages:[]})
        return chat
    }catch (error){
        throw Error(error.message)
    }

}

chatSchema.statics.sendMessage = async function(req){
    const {text,chatID} = req.body
    const senderID = req.account._id
    let emptyFields = []
    if(!mongoose.Types.ObjectId.isValid(senderID) || !mongoose.Types.ObjectId.isValid(chatID)){
        throw Error("Chat or user does not exists")
    }
    if(!senderID) emptyFields.push('senderID')
    if(!text) emptyFields.push('text')
    if(!chatID) emptyFields.push('chatID')
    if(emptyFields.length > 0){
        throw Error("Please fill in all fields", emptyFields)
    }
    const message = {senderID: senderID, text:text, timeStamp: Date.now()}

    try{
        let chat = await this.findById(chatID)
        if(!chat){
            throw Error("Chat does not exist")
        }
        chat.messages.push(message)
        chat = await this.findByIdAndUpdate({_id:chatID}, {"messages": chat.messages}, {returnOriginal:false})
        return chat
    } catch(error){
        throw Error(error.message)
    }
}

chatSchema.statics.getChatByChatID = async function(req){
    const {chatID} = req.body;
    if(!mongoose.Types.ObjectId.isValid(chatID)){
        throw Error("Chat does not exist")
    }
    try{
        let chat = await this.findById({_id:chatID})
        if (!chat) {
            throw Error("Chat does not exist")
        }
        return chat
    }catch(error){
        throw Error(error.message)
    }

}

chatSchema.statics.getAllUserChats = async function(req){
    const userID = req.account._id
    if(!mongoose.Types.ObjectId.isValid(userID)){
        throw Error("User does not exists")
    }
    try{
        let chatsAsCreator = await this.find({jobCreatorID: userID})
        if(!chatsAsCreator){
            chatsAsCreator = {}
        }
        let chatsAsWorker = await this.find({workerID: userID})
        if(!chatsAsWorker){
            chatsAsWorker = {}
        }
        chatsAsCreator = Object.values(chatsAsCreator)
        chatsAsWorker = Object.values(chatsAsWorker)
        const chats = chatsAsCreator.concat(chatsAsWorker)
        
        return chats
    } catch(error){
        throw Error(error.message)
    }

}


module.exports = mongoose.model('Chat', chatSchema)