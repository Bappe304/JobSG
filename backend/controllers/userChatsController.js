const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const {ChatObserver}  = require('../observers/ChatObserver')
const Account = require('../models/AccountModel')


class userChatsController extends ChatObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleChatsRetrieval = this.handleChatsRetrieval.bind(this)
        
    }
    async update(req){
        const chats = await Chat.getAllUserChats(req)
        return chats
        
    }

    async handleChatsRetrieval(req,res){
        try{
            const chats = await this.update(req)
            const id = req.account._id
            const allChats = []
            for (let i = 0; i < chats.length; i++){
                let chat = JSON.parse(JSON.stringify(chats[i]))
                if (chat["workerID"] != id){
                    chat["name"] = await Account.getName(chat["workerID"])
                    
                }
                else{
                    chat["name"] = await Account.getName(chat["jobCreatorID"])
                    
                }
                allChats.push(chat)
    
            }

            res.status(200).json(allChats)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = {userChatsController}