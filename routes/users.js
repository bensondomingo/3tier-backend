const express = require('express')
const { body, validationResult } = require('express-validator')

const router = express.Router()
const User = require('../models/users')

const validators = [
  body('firstName').trim().not().isEmpty().withMessage('first name required'),
  body('lastName').trim().not().isEmpty().withMessage('last name required'),
  body('email').trim().isEmail().normalizeEmail().withMessage('Invalid email')
]

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.send({ users })
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', ...validators, async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(400).send({ errors: errors.errors })
    return
  }

  const { firstName, lastName, email } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    console.log('email in use')
    res.status(400).send({
      errors: [
        {
          value: email,
          msg: 'Email in use',
          param: 'email',
          location: 'body'
        }
      ]
    })
    return
  }

  const user = await new User({ firstName, lastName, email }).save()
  res.status(201).send(user)
})

module.exports = router
