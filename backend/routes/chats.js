const requireAuth = require('../middleware/sessionController')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const {
    createChat,
    getAllUserChats,
    getChatByChatID,
    sendMessage

} = require('../controllers/chatWindowController')

//protected routes
router.use(requireAuth)

//create a chat with a worker
router.post('/createChat', createChat)

router.get('/getUserChats', getAllUserChats)

router.get('/getChat/:id', getChatByChatID)

router.post('/getChat/:id', sendMessage)

module.exports = router