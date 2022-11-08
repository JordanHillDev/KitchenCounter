const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require("method-override");
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard')
const masterListRoutes = require('./routes/masterList')
const inventoryRoutes = require('./routes/inventory')

// .env File
require('dotenv').config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

// Database Connect
connectDB()

// View Engine
app.set('view engine', 'ejs')

// Static Folder
app.use(express.static('public'))

// Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// Use Forms for PUT / DELETE
app.use(methodOverride("_method"))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash Messages for errors, info, etc.
app.use(flash())
 
// Routes
app.use('/', mainRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/masterList', masterListRoutes)
app.use('/inventory', inventoryRoutes)
 
// Server 
app.listen(process.env.PORT, () => {
    console.log(`KitchenCounter is running on port ${process.env.PORT}`)
})    