'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')
const userController = require('../controllers/user')

const User = require('../models/user')

api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)

api.post('/login', (req, res) => {
  console.log('POST /api/login')
  console.log(req.body)

  if(!req.body.email){
    return res.status(400).send('Email is required')
  }
  if(!req.body.password){
    return res.status(400).send('Password is required')
  }
  User.findOne({ username: req.body.email }, (err, user) => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(err) res.status(500).send({ message: `Something happened when comparing`})
      if(!isMatch){
        res.status(404).send({message: 'Invalid password'})
      } else {
        res.status(200).send('Congrats!Youre now logged in!')
      }
    })
  })

})

module.exports = api
