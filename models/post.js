let mongoose = require('mongoose')

let PostSchema = new mongoose.Schema({
  title: String,
  content: String
})

let PostModel = mongoose.model('post', PostSchema)

module.exports = PostModel
