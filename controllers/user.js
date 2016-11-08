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

function getUsers(req, res){
  User.find({}, (err, users) => {
    if(err)return res.status(500).send({message: `Server Error ${err}`});
    if(!users)return res.status(404).send({message: `No servers found on the DB `});

    res.status(200).send({users});
  });
}

function saveUser(req, res){
  console.log('POST /api/user')
  console.log(req.body)

  let user = new User()
  user.email = req.body.email;
  user.displayName = req.body.displayName;
  user.password = req.body.password;

  user.save((err, userStored) => {
    if(err) res.status(500).send({message: `Error while saving User on the DB ${err}`})

    res.status(200).send({user: userStored})
  })
}

module.exports = {
  getUser,
  getUsers,
  saveUser
 }
