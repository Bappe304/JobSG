const requireAuth = require('../middleware/sessionController')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const {chatWindowController}= require('../controllers/chatWindowController')
const {createChatController} = require('../controllers/createChatController')
const {sendMessageController} = require('../controllers/sendMessageController')
const {userChatsController} = require('../controllers/userChatsController')

const chatWindowControl = new chatWindowController()
const createChatControl = new createChatController()
const sendMessageControl = new sendMessageController()
const userChatsControl = new userChatsController()
//protected routes
//all routes below this require session cookie (login) to access
router.use(requireAuth)

//create a chat with a worker
//requires session cookie and id of worker
router.post('/createChat', createChatControl.handleChatCreation)

//get all of a user chat
// only requires session cookie
router.get('/getUserChats', userChatsControl.handleChatsRetrieval)

//get a specific chat
//requires session cookie and chatID
router.get('/getChat/:id', chatWindowControl.handleGetChatByChatID)


//sends message to a specific chat
//requires session cookie, chatID and message to send
router.post('/getChat/:id', sendMessageControl.handleSendMessage)

module.exports = router