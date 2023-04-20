const QNAChat = require('../model/QNAChat')
const QNAMessage = require('../model/QNAMessage');
const mongoose = require("mongoose");

module.exports.createChat = async(req, res) => {
    
    try {
        const chat = await QNAChat.create({chatName: 'new chat'});
        res.status(201).json(chat);
    } catch (error) {
        throw error;
    }
}
module.exports.fetchAllChats = async(req, res) => {
    try {
        const Allchats = await QNAChat.find()
        res.status(200).json(Allchats);
    } catch (error) {
        throw error;
    }
}
module.exports.deleteChat = async(req, res) => {
    const {id} = req.body;
    try {
        await QNAMessage.deleteMany({chat: id}).then(async (respond)=>{
            const chat = await QNAChat.findByIdAndDelete(id);
            res.status(200).json(true);
        }).catch(err=>{
            res.status(500).json(false);
            throw err
        })
       
    } catch (error) {
        throw error;
    }
}