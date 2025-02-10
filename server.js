const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')

require('dotenv').config()
const PORT = process.env.PORT || 8000


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static('public'))
app.use(cookieParser())
app.use(session(
    {
        secret: "my secret key",
        resave: false,
        saveUninitialized: true
    }
))


app.use(flash())

app.use(express.static('public'))
app.use('/public', express.static('uploads'));

app.set('view engine', 'ejs')

const passport = require('passport')
const passportAuth = require('./config/Passport')
passportAuth(passport)

app.use(passport.initialize())
app.use(passport.session())


const BlogRoute = require('./routers/Blog.Routers')
const adminroute = require("./routers/Admin.Routes")
const viewroute = require('./routers/View.Routes')



app.use('/', viewroute)
app.use('/api/blog', BlogRoute)
app.use('/api/blogadmin', adminroute)



require('./config/db').dbconnect()


app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))