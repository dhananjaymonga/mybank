const express = require('express');
const Users = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const users = require('../models/users');

const SECRET = 'jbfhi3298r7473r$#%@%^#$@#%';

router.post('/signup', async (req, res) => {
  const data = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(data.password, salt)
    data.password = newPassword;

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'vikky4singh4@gmail.com',
        pass: 'bypqytdtohwkmjkj'
      }
    })

    

    const newUser = await Users.create(data);
    const token = await jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '1h' });

    const messageID = await transport.sendMail({
      from: 'zatch9bell9@gmail.com',
      to: data.email,
      subject: 'verification',
      html: `
      click here to verify <a href="http://localhost:3000/verify?token=${token}">verify</a>   
      `
    })

    res.status(201).json(newUser);
  }
  catch(err) {
    console.log(err)
    res.status(501).json(err);
  }
})

router.get('/verify-email', async (req, res) => {
  let token =  req.query.token;
  try {
    const user = await jwt.verify(token, SECRET);
    const obj = Users.findOne({_id:user._id});

    if(obj) {
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 259200000
      })

      console.log('verified')
      
      res.status(200).send('verified successfully');
    }
  }
  catch(err) {
    res.status(401).json(err)
  }
})

router.get('/logout', (req, res) => {
  if(req.cookies.jwt) {
    res.clearCookie('jwt');
    res.status(200).send('ok');
  }
  else {
    res.status(401).json({error: 'you don not have any token to logout'})
  }
})

router.get('/check', async (req, res) => {  
  const token  = req.cookies.jwt;

  if(!token) {

    return res.status(400).json({ msg: 'ok'})
  }

  try {    
    const data = await jwt.verify(token, SECRET);
    const user = await Users.findById(data._id);
    if(user) {
      res.status(200).json({ msg: 'ok' })
    }
    else {
      res.status(401).json({ error: 'invalid token' });
    }
  }
  catch(err) {
    res.status(401).json(err);
  }
})

router.post('/login', async (req, res) => {
  const data = req.body;

  try {
    const user = await Users.findOne({ email: data.email });
    if(!user) {
      return res.status(401).json({ error: 'invalid email or password '});
    }
    const isMatching = await bcrypt.compare(data.password, user.password);
    if(!isMatching) {
      return res.status(401).json({ error: 'invalid email or password '}); 
    }

    const token = await jwt.sign({ _id: user._id }, SECRET);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 259200000
    })
    res.status(200).json(user);
  }
  catch(err) {
    res.status(501).json(err);
  }
})

module.exports = router