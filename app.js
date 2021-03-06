'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const api = require('./routes/index')
const cors = require('cors')
const config = require('./config')
const expressJWT = require('express-jwt')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(expressJWT({ secret: 'my secret word'}).unless({ path: ['/api/login', '/api/signup']}))
app.use(cors())
app.use('/api', api)

app.get('/', (req,res) => {
  res.status(200).send({ message: `Hi there, this API is available on http::/localhost:${config.port}/api/`})
})

module.exports = app
