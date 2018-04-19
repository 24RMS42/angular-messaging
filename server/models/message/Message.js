const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User');

const MessageSchema = new Schema({  
  roomId: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  content: {
    type: String
  },
  from: {
    id: { type: Number },
    name: { type: String },
    avatar: { type: String }
  },
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Message', MessageSchema);  
