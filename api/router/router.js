const {createChat, fetchAllChats, deleteChat} = require('../controller/ChatController');
const {saveMessage, fetchAllMessages} = require('../controller/MessagesController')

const router = require('express').Router();

router.post('/create-chat', createChat);
router.get('/all-chats', fetchAllChats);
router.post('/delete-chat', deleteChat)
// messages routes
router.post('/save-msg', saveMessage);
router.get('/all-msg/:id', fetchAllMessages);
module.exports = router;