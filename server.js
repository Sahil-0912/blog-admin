const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = process.env.PORT || 8000


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static('public'))
app.use('/public', express.static('uploads'));

app.set('view engine', 'ejs')




const BlogRoute = require('./routers/Blog.Routers')
const viewroute = require('./routers/view.routes')
const adminroute = require('./routers/Admin.ROuter')


app.use('/', viewroute)
app.use('/api/blog', BlogRoute)
app.use('/api/blogadmin', adminroute)



require('./config/db').dbconnect()


app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))