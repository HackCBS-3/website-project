const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blog = require('../models/comments');// *Utils
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

const commentController = require('../controllers/commentcontrollers');
const Professional = require('./models/professional');
const User = require('./models/user');
const { userInfo } = require('os');
const passport = require('passport');
const { protectProfessional } = require('../middleware/auth');
const { protectUser } = require('../middleware/auth');

router.post('/writecomment',commentController.comment );
router.get('/deletecomment',commentController.delete );
router.put('/editcomment', commentController.edit);

module.exports = router;
