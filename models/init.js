let mongoose = require('mongoose')
let config = require('../config')

mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
})
mongoose.connection.on('connected', (req, res) => {
  console.log('MongoDb connected success')
})
