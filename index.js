'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {

  Product.find({}, (err, products) => {
    if(err)return res.status(500).send({message: `Server Error ${err}`})
    if(!products)return res.status(404).send({message: `No products found on the DB `})

    res.status(200).send({products})
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if(err)return res.status(500).send({message: `Server Error ${err}`})
    if(!product)return res.status(404).send({message: `Product does not exist`})

    res.status(200).send({product: product})
    // or
    // res.status(200).send({product})
  });
})

app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if(err) res.status(500).send({message: `Error while saving on the DB ${err}`})

    res.status(200).send({product: productStored})
  })
})

app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId;
  let updateFields = req.body

  Product.findByIdAndUpdate(productId, updateFields, (err, productUpdated) => {
    if(err)return res.status(500).send({message: `Error while updating product ${err}`})
    
    res.status(200).send({ product: productUpdated })
  });
})

app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error while deleting product ${err}`})
    if(!product)return res.status(404).send({message: `Product does not exist`})
    product.remove(err => {
      if(err) res.status(500).send({message: `Error while deleting product ${err}`})

      res.status(200).send({message: `Product with id ${productId} deleted`})
    })
  })
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error while connecting to the DB: ${err}`)
  }
  console.log('DB connection OK...')

  app.listen(3000, () => {
    console.log(`API Rest Listen on http://localhost:${port}`);
  })

})
