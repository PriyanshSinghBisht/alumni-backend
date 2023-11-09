const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
       
       text: {
          type: String,
          required: true
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users', 
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
});

const Comment = mongoose.model('comments', commentModel);
module.exports = Comment;