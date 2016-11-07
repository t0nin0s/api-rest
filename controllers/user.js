'use strict'

const User = require('../models/user')

function getUser(req, res){
  console.log("the paramas are " + req.body)
  if(!req.body.email){
    return res.status(400).send('Email is required')
  }
  if(!req.body.password){
    return res.status(400).send('Password is required')
  }

  User.findOne({ username: req.body.email }, (err, user) => {
    if(err)return res.status(500).send({ message: `Something happened when trying to findOne`})
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(err) res.status(500).send({ message: `Something happened when comparing`})
      if(!isMatch){
        res.status(404).send({message: 'Invalid password'})
      } else {
        res.status(200).send('Congrats!Youre now logged in!')
      }
    })
  })
}

module.exports = { getUser }
