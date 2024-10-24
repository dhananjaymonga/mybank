const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Contacts = require('../models/contacts');

const SECRET = 'jbfhi3298r7473r$#%@%^#$@#%';


router.get('/', async (req, res) => {

  const jwtToken = req.cookies.jwt;

  try {
    const user = await jwt.verify(jwtToken, SECRET);
    const fetchedContacts = await Contacts.findOne({ userID: user._id }, { _id: 0, contacts: 1 })

    res.status(200).json(fetchedContacts.contacts);
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  const data = req.body;
  const jwtToken = req.cookies.jwt;

  try {
    
    const user = await jwt.verify(jwtToken, SECRET);
    const c = await Contacts.updateOne({ userID: user._id }, { $push: {contacts: {name: data.name}}}, { upsert: true });
    const savedContact = await Contacts.findOne({ userID: user._id });

    const latestRecord = savedContact.contacts[savedContact.contacts.length - 1];

    res.status(201).json(latestRecord);
  }
  catch(err) {
    console.log(err)
    res.status(400).json(err)
  }
})


router.get('/payment/:decision/:id', async (req, res, next) => {
  const { decision, id } = req.params;
  const jwtToken = req.cookies.jwt;
  const amount = req.query.amount;

  try {
    
    const user = await jwt.verify(jwtToken, SECRET);
    const result = await Contacts.updateOne({ userID: user._id, 'contacts._id': id }, { $inc: { 'contacts.$.amount': decision == 'pay' ? -amount : amount }});
    next();
  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.get('/payment/:decision/:id', async (req, res) => {
  const { decision, id } = req.params;
  const jwtToken = req.cookies.jwt;

  try {
    
    const user = await jwt.verify(jwtToken, SECRET);
    const saved = await Contacts.updateOne({ userID: user._id }, { $push: {history : {name: req.query.name, amount: decision == 'pay' ? -req.query.amount: req.query.amount }}}, { upsert: true });
    res.status(200).send('ok')
  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.get('/history/:userID', async (req, res) => {
  const { userID } = req.params;
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  try {
    if(!userID) {
      return res.status(401).json({ error: 'no user exits' });
    }

    const data = await Contacts.findOne({userID},  {contacts: 0, _id: 0, userID: 0, __v: 0, history: {$slice: [offset,limit]}});
    res.status(200).json(data);
  }
  catch(err) {
    res.status(501).json(err);
  }
})

module.exports = router;