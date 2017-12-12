let userModel = require('../models/user')
let config = require('../config')

function authUser(req, res, next) {
  const authToken = req.signedCookies[config.cookieName] || ''
  res.locals.currentUser = null

  if (authToken) {
    userModel.findOne({_id: authToken}, (err, user) => {
      if (err) {
        next()
      } else {
        res.locals.currentUser = user
        next()
      }
    })
  } else {
    next()
  }
}

module.exports = {authUser}
