const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const usersRouter = require('./routes/users')
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use('/users', usersRouter)

const startApp = async () => {
  try {
    await mongoose.connect('mongodb://mongo/3tier', {
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
