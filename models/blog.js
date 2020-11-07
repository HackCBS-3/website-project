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
        type: String,
        ref: Professional
    },
    body: {
         type:String 
    },
    comments:[{
        commentor:{
            type:ObjectID
        },
        body:
        {
          type: String,
          required: true
        }
    
    }]

 })
  const Blog = mongoose.model('blogs', blogSchema);
  module.exports = Blog;