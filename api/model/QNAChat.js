const mongoose = require("mongoose");

const QNAChatModel = mongoose.Schema({
        chatName: { type: String, trim: true },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QNAMessage",
        },
    },
    { timestamps: true }
);

const QNAChat = mongoose.model("QNAChat", QNAChatModel);
module.exports = QNAChat;