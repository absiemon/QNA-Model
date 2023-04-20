const mongoose = require("mongoose");

const QNAMessageModel = mongoose.Schema(
  {
    content: {
      question:{type: String, required: true},
      answer: {type: String, required: true}
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "QNAChat" },
  },
  { timestamps: true }
);
 
const QNAMessage = mongoose.model("QNAMessage", QNAMessageModel);
module.exports = QNAMessage;