const mongoose = require('mongoose');
const Professional = require('./models/professional');
const validator = require('validator')


const Blog = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
        type: String,
        ref: Professional
    },
    body: {
         type:String 
    }
 })
  const Blog = mongoose.model('blogs', blogSchema);
  module.exports = Blog;