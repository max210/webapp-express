let express = require('express')
let postModel = require('../models/post')
let marked = require('marked')
let auth = require('../middlewares/auth')

let router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', {title: 'express'})
})

router.get('/posts', (req, res, next) => {
  res.render('posts', {title: 'posts'})
})

router.get('/posts/create', auth.adminRequired, (req, res, next) => {
  res.render('create')
})

router.get('/posts/show', (req, res, next) => {
  let id = req.query.id

  postModel.findOne({_id: id}, (err, post) => {
    post.content = marked(post.content)
    res.render('show', {post})
  })
})

router.get('/posts/edit', (req, res, next) => {
  let id = req.query.id

  res.render('edit', { id })
})

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

module.exports = router
