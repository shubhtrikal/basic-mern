const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type : String,
    enum : ['user', 'admin', 'superadmin'],
    default : 'user',
  }
});

module.exports = User = mongoose.model("users", UserSchema);
