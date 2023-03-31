const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const {ChatObserver}  = require('../observers/ChatObserver')


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
            res.status(200).json(chats)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = {userChatsController}