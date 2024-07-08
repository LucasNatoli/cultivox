'use strict'

const express = require('express')
const models = require('./models')
const router = require('./router')
const cors = require('cors');

const app = express()

const env = process.env;
const PORT = env.USRACCNT_PORT;

// Add CORS headers
app.use(cors({
  origin: '*'
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app, models)

models.sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log('🚀 app listening on port:', PORT)
    })
  })
  .catch((err) => console.error('💀 DB ERR:', err.original))