const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Sub-document
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //Every survey would belong to one particular id
  //This would help set up that relation
  _user: { type: Schema.Types.ObjectId, ref: "User" },

  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model("surveys", surveySchema);
