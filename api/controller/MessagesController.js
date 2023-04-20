const QNAChat = require('../model/QNAChat')
const QNAMessage = require('../model/QNAMessage');
const aksQuestions = require('../langchain');

module.exports.saveMessage = async(req, res)=>{
    const {id, question} = req.body;
    try {
        const answer = await aksQuestions(question);
        const params = {
            content: {
                question,
                answer:answer.text
            },
            chat: id,
        }
        await QNAMessage.create(params);
        res.status(201).json(answer.text);
    } catch (error) {
        throw error;
    }
}
module.exports.fetchAllMessages = async(req, res)=>{
    const {id} = req.params;
    try {
        const allMsgs = await QNAMessage.find({chat: id});
        res.status(200).json(allMsgs);
    } catch (error) {
        throw error;
    }
}