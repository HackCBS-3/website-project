const mongoose = require('mongoose');
const Professional = require('./models/professional');
const validator = require('validator');
const { ObjectID } = require('bson');


const Blog = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
        type: ObjectID,
        ref: Professional
    },
    body: {
         type:String 
    },
      comments:{
        ref: Comment
      }

 })
  const Blog = mongoose.model('blogs', blogSchema);
  module.exports = Blog;