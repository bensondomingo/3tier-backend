const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)

const startApp = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/3tier', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to database')
  } catch (error) {
    console.log(error)
  }
  app.listen(4000, () => {
    console.log('Listening to port 4000')
  })
}

console.log('starting app')

startApp()
