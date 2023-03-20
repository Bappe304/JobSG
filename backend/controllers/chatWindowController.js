const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//need to add logic to prevent creation of same chat between users
const createChat = async function (req,res){
    const {workerID} = req.body
    const jobCreatorID = req.account._id
    let emptyFields = []
    if(!workerID) emptyFields.push('workerID')
    if(!jobCreatorID) emptyFields.push('jobCreatorId')
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    try{
        const chat = await Chat.create({jobCreatorID, workerID, messages:[]})
        res.status(200).json(chat)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const getChatByChatID = async function(req,res) {
    const {chatID} = req.body;
    if(!mongoose.Types.ObjectId.isValid(chatID)){
        return res.status(400).json({error:"Chat does not exist"})
    }
    try{
        let chat = await Chat.findById({_id:chatID})
        if (!chat) {
            return res.status(400).json({error:"Chat does not exist"})
        }
        return res.status(200).json(chat)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllUserChats = async function(req,res){
    const userID = req.account._id
    if(!mongoose.Types.ObjectId.isValid(userID)){
        return res.status(400).json({error:"User does not exists"})
    }
    try{
        let chatsAsCreator = await Chat.find({jobCreatorID: userID})
        if(!chatsAsCreator){
            chatsAsCreator = {}
        }
        let chatsAsWorker = await Chat.find({workerID: userID})
        if(!chatsAsWorker){
            chatsAsWorker = {}
        }
        const chats = Object.assign({}, chatsAsCreator, chatsAsWorker);
        res.status(200).json(chats)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    
}

//need to add validation to ensure only relevant users can access chat
const sendMessage = async function(req,res){
    const {text,chatID} = req.body
    const senderID = req.account._id
    let emptyFields = []
    if(!mongoose.Types.ObjectId.isValid(senderID) || !mongoose.Types.ObjectId.isValid(chatID)){
        return res.status(400).json({error:"Chat or user does not exists"})
    }
    if(!senderID) emptyFields.push('senderID')
    if(!text) emptyFields.push('text')
    if(!chatID) emptyFields.push('chatID')
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    const message = {senderID: senderID, text:text, timeStamp: Date.now()}
    try{
        let chat = await Chat.findById(chatID)
        if(!chat){
            return res.status(400).json({error:"Chat does not exist"})
        }
        chat.messages.push(message)
        chat = await Chat.findByIdAndUpdate({_id:chatID}, {"messages": chat.messages}, {returnOriginal:false})
        res.status(200).json(chat)
    } catch(error){
        res.status(400).json({error: error.message})
    }

}



module.exports= {
    createChat,
    getAllUserChats,
    getChatByChatID,
    sendMessage

}