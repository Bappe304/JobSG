const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {ChatObserver}  = require('../observers/ChatObserver')
const Account = require('../models/AccountModel')


class chatWindowController extends ChatObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetChatByChatID = this.handleGetChatByChatID.bind(this)
        
    }
    async update(req){
        const chat = await Chat.getChatByChatID(req)
        return chat
        
    }

    async handleGetChatByChatID(req,res){
        try{
            const chat = await this.update(req)
            const id = req.account._id
            let updatedChat = JSON.parse(JSON.stringify(chat))
            if (updatedChat["workerID"] != id){
                updatedChat["name"] = await Account.getName(updatedChat["workerID"])
                
            }
            else{
                updatedChat["name"] = await Account.getName(updatedChat["jobCreatorID"])

            }

            res.status(200).json(updatedChat)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = {chatWindowController}
/*
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
    

}



module.exports= {
    createChat,
    getAllUserChats,
    getChatByChatID,
    sendMessage

}
*/
