import mongoose from 'mongoose'

let PostSchema = new mongoose.Schema({
  title: String,
  content: String
})

let PostModel = mongoose.model('post', PostSchema)

export default PostModel
