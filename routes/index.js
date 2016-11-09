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

api.post('/signup', userController.signUp)
api.post('/login', userController.getUser)
api.get('/user', userController.getUsers)

module.exports = api
