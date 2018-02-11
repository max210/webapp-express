let errHandle = function (err, next) {
  err.status = 500
  next(err)
}

export default errHandle
