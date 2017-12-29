import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  name: String,
  pass: String
})

const userModel = mongoose.model('user', userSchema)

export default userModel
