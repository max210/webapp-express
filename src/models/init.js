import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
})
mongoose.connection.on('connected', (req, res) => {
  console.log('MongoDb connected success')
})
