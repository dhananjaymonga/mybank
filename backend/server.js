const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./router/user');
const contactRouter = require('./router/contact');

const app = express()
const port = 4000

app.use(cors({
  origin: 'https://mybank-silk.vercel.app',
  credentials: true
}))

app.use(cookieParser());

app.use(express.json())
app.use('/users', userRouter);
app.use('/contacts', contactRouter);

mongoose.connect('mongodb+srv://dhananjaymonga10:hZcY9ZPNfU6uhM8B@cluster0.bwc3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(port, () => {
    console.log('listening at port ', port)
  })  
})
.catch(err => console.log(err))

