const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogcontrollers');
const Professional = require('./models/professional');
const { userInfo } = require('os');
const passport = require('passport');
const { protectProfessional } = require('../middleware/auth');

router.post('/writeblog',[protectProfessional], blogController.writeblog);
router.get('/deleteblog',[protectProfessional], blogController.deleteblog);
router.put('/editblog', [protectProfessional], blogController.editblog);
router.get('/dashboard',  blogController.allblogs);


module.exports = router;
