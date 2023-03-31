const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const {ChatObserver}  = require('../observers/ChatObserver')


class sendMessageController extends ChatObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleSendMessage = this.handleSendMessage.bind(this)
        
    }
    async update(req){
        const chat = await Chat.sendMessage(req)
        return chat
    }

    async handleSendMessage(req,res){
        try{
            const chat = await this.update(req)
            res.status(200).json(chat)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = {sendMessageController}