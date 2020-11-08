const mongoose = require('mongoose');
const Professional = require('./models/professional');
const validator = require('validator');
const { ObjectID } = require('bson');


const Comment = new Schema({
  content: { 
      type: String, required: true
     },
  
      timestamps: {
          createdAt: 'created_at'
        },
commentor:{
    type:ObjectID,
    ref:User
}
});

module.exports = mongoose.model("Comment", CommentSchema);
  const Blog = mongoose.model('blogs', blogSchema);
  module.exports = Blog;