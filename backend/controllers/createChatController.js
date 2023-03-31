const Chat = require('../models/ChatModel')
const mongoose = require('mongoose')
const {ChatObserver}  = require('../observers/ChatObserver')


class createChatController extends ChatObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleChatCreation = this.handleChatCreation.bind(this)
        
    }
    async update(req){
        const chat = await Chat.createChat(req)
        return chat
        
    }

    async handleChatCreation(req,res){
        try{
            const chat = await this.update(req)
            res.status(200).json(chat)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = {createChatController}