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


// @desc     To write a blog
// @route    POST /api/blog/writeblog
// @access   Only for Professionals and users
module.exports.writeblog = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    const { title,author,body}=req.body;
    try{
        let blog = await Blog.findOne({author: req.user._id,title : req.body.title });
    if (!blog) {
      return res.status(400).json('A blog with the same title is already written by you');
    }
  
      blogs= new Blog({
        author:req.user._id,
        title: req.body.title,
        body:req.body.body
      });
      console.log(blogs);
      await blogs.save();
    
}catch(err)
{
    console.log(err);
    return res.status(500).send('server error');
}

};


// @desc     To edit a blog
// @route    POST /api/blog/editblog
// @access   Only for Professionals and users
module.exports.editblog = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    const { title,author,body}=req.body;
    try{
        let blog_check = await Blog.findOneById(req.params.id);
        if(!blog_check)
        {
            return res.status(400).json('Does not exist');
        }
        if(blog.author.toString()!=req.user._id.toString())
        {
            return res.status(400).json('Only authors can edit the blogs');
        }
        let blog = await Blog.findByIdAndUpdate(req.params.id);
        return res.status(200).json(blog);
}catch(err)
{
    console.log(err);
    return res.status(500).send('server error');
}

};



// @desc     To delete a blog
// @route    POST /api/blog/deleteblog
// @access   Only for Professionals and users
module.exports.deleteblog = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    try{
        let blog_check = await Blog.findById(req.params.id);
        if(!blog_check)
        {
            return res.status(400).json('Does not exist');
        }
        if(blog_check.author.toString()!=req.user._id.toString())
        {
            return res.status(400).json('Only authors can delete the blogs');
        }
        let blog = Blog.findById(req.params.id);
        await blog.remove();
        return res.status(200)

}catch(err)
{
    console.log(err);
    return res.status(500).send('server error');
}

};


// @desc     To display all blogs
// @route    POST /api/blog/dashboard
// @access   Only for any loggen in user
module.exports.allblogs = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()}); 
    }
    try{
        let all_blogs = await Blog.find({});
        if(!all_blogs)
        {
            return res.status(400).json('Does not exist');
        }
        return res.status(200).json(all_blogs);

}catch(err)
{
    console.log(err);
    return res.status(500).send('server error');
}

};