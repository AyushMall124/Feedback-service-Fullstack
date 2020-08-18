const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 5 },
});

mongoose.model("users", UserSchema);
