const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()

// Load routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Passport Config
require('./config/passport')(passport);

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body parser midleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Method override midleware
app.use(methodOverride('_method'))

// Express Session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.user = req.user || null
	next()
})

// Index rout
app.get('/', (req, res) => {
	const title = 'Welcome'
	res.render('index', { title })
})

// About route
app.get('/about', (req, res) => {
	res.render('about')
})

// Use routes
app.use('/ideas', ideas)
app.use('/users', users)

const port = 5000

app.listen(port, () => {
	console.log(`Server started on port ${port}...`)
})


