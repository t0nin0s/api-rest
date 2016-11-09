'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')

function getUser(req, res){
  if(!req.body.email){
    return res.status(400).send('Email is required')
  }
  if(!req.body.password){
    return res.status(400).send('Password is required')
  }
  User.findOne({ email: req.body.email }, function(err, user) {

    user.comparePassword(req.body.password, function(err, isMatch) {
      if(err)return res.status(500).send({ message: `Something happened when comparing`})
      if(!isMatch){
        return res.status(404).send({message: 'Invalid password'})
      } else {
        var myToken = jwt.sign({email: req.body.email}, 'my secret word')
        return res.status(200).send({message: `Congrats!Youre now logged in!`, token: myToken })
      }
    })
  })
}

function getUsers(req, res){
  User.find({}, (err, users) => {
    if(err)return res.status(500).send({message: `Server Error ${err}`});
    if(!users)return res.status(404).send({message: `No servers found on the DB `});

    res.status(200).send({users});
  });
}

function signUp(req, res){
  console.log('POST /api/user')
  console.log(req.body)
  if(!req.body.email || !req.body.password) res.status(500).send({ message: "Please pass name and password" })

  let user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })


  user.save((err, userStored) => {
    if(err) return res.status(500).send({message: `User already exists`})
    else return res.status(200).send({user: userStored})
  })
}

module.exports = {
  getUser,
  getUsers,
  signUp
 }
