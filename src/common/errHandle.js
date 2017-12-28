let errHandle = function (err, next) {
  err.status = 500
  next(err)
}

module.exports = errHandle
