// *Utils
const { check, validationResult } = require('express-validator');
const sendEmail = require("../utils/sendEmail");

// *NPM Packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const otpGenerator = require("otp-generator");
const nodemailer = require('nodemailer');

// *Models
const Professional = require('../models/professional');
const Blog = require('../models/blog');
const { findByIdAndDelete, findByIdAndUpdate } = require('../models/professional');

// @desc     To write a comment
// @route    POST /api/comment/comment
// @access   Only for Professionals and users
module.exports.comment = async(req,res) =>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    const{content}=req.body;
    try{
        let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json('This blog does not exist');
    }
     comments =new Comment({
         content: req.body.content,
         commentor: req.user._id
     });
     await blogs.save();
    return res.status(200).json(comments);
    }catch(err)
    {
        console.log(err);
        return res.status(500).send('server error');
    }
};


// @desc     To delete a comment
// @route    POST /api/comment/delete
// @access   Only for Professionals and users
module.exports.delete = async(req,res) =>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    try{
        let comment_check = await Comment.findById(req.params.id);
    if (!comment_check) {
      return res.status(400).json('This comment does not exist');
    }
    if(comment_check.commentor.toString()!=req.user._id)
    {
        return res.status(400).json('You cannot delete this comment');
    }
    let comment = await findByIdAndDelete(req.params._id); 
    return res.status(200).json(comment);
    }catch(err)
    {
        console.log(err);
        return res.status(500).send('server error');
    }
};


// @desc     To edit a comment
// @route    POST /api/comment/edit
// @access   Only for Professionals and users
module.exports.edit = async(req,res) =>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    const{content}=req.body;
    try{
        let comment_check = await Comment.findById(req.params.id);
    if (!comment_check) {
      return res.status(400).json('This comment does not exist');
    }
    if(comment_check.commentor.toString()!=req.user._id)
    {
        return res.status(400).json('You cannot edit this comment');
    }
    let comment = await findByIdAndUpdate(req.params._id); 
    return res.status(200).json(comment);
    }catch(err)
    {
        console.log(err);
        return res.status(500).send('server error');
    }
};