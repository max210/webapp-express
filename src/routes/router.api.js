import express from 'express'
import postModel from '../models/post'
import errHandle from '../common/errHandle'
import bcrypt from 'bcrypt'
import userModel from '../models/user'
import config from '../config'

let router = express.Router()

router.get('/users', (req, res, next) => {
  res.send('response with resource')
})

//查找文章列表
router.get('/posts', (req, res, next) => {
  postModel.find({}, {}, (err, posts) => {
    if (err) {
      errHandle(err, next)
    }
    res.json({postsList: posts})
  })
})

//新增文章
router.post('/posts/create', (req, res, next) => {
  let title = req.body.title
  let content = req.body.content

  let post = new postModel()
  post.title = title
  post.content = content
  post.save((err, doc) => {
    if (err) {
      errHandle(err, next)
    } else {
      res.json({post: doc})
    }
  })
})

// 查找特定文章
router.get('/posts/one', (req, res, next) => {
  let id = req.query.id

  postModel.findOne({_id: id}, (err, post) => {
    if (err) {
      errHandle(err, next)
    }

    res.json({post})
  })
})

//更新文章
router.post('/posts/:id', (req, res, next) => {
  let id = req.body.id
  let title = req.body.title
  let content = req.body.content

  postModel.findOneAndUpdate({_id: id}, {title, content}, (err) => {
    if (err) {
      errHandle(err, next)
    } else {
      res.json({})
    }
  })
})

// 注册
router.post('/signup', (req, res, next) => {
  let name = req.body.name,
      pass = req.body.pass,
      rePass = req.body.rePass

  if (pass !== rePass) {
    return errHandle(new Error('两次密码不对'), next)
  }

  let user = new userModel()
  user.name = name
  user.pass = bcrypt.hashSync(pass, 10)
  user.save(err => {
    if (err) {
      errHandle(err, next)
    } else {
      res.end()
    }
  })
})

// 登录
router.post('/signin', (req, res, next) => {
  let name = req.body.name,
      pass = req.body.pass

  userModel.findOne({name}, (err, user) => {
    if (err || !user) {
      return errHandle(new Error('用户不存在'), next)
    } else {
      let isOk = bcrypt.compareSync(pass, user.pass)
      if (!isOk) {
        return errHandle(new Error('密码不正确'), next)
      }

      let authToken = user._id
      let opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
      }
      res.cookie(config.cookieName, authToken, opts)
      res.end()
    }
  })
})

export default router
