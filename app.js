require('./models/init')
let express = require('express')
let config = require('./config')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let expressLayouts = require('express-ejs-layouts')
let auth = require('./middlewares/auth')
let connectMongodb = require('connect-mongo')
let session = require('express-session')

let api = require('./routes/router.api')
let page = require('./routes/router.page')
let MongoStore = new connectMongodb(session);

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('+crypto.randomBytes(64)+'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: config.sessionSecret,
    store: new MongoStore({
      url: 'mongodb://192.168.99.100:32788/webapp-expressss'
    }),
    resave: true,
    saveUninitialized: true
  })
)
app.use(auth.authUser)
app.use('/', page)
app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
