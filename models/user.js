let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: String,
  pass: String
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
