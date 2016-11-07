'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error while connecting to the DB: ${err}`)
  }
  console.log('DB connection OK...')

  app.listen(3000, () => {
    console.log(`API Rest Listen on http://localhost:${config.port}`);
  })
  
})
