const admin = require('../model/Admin.Model')
const Blog = require('../model/Blog.Model')

const { matchlogin } = require('../utils/login.middleware')
const router = require('express').Router()
router.get('/', (req, res) => {
    // res.render('pages/index')
    matchlogin(req, res, 'Pages/index')
})
router.get('/AddBlog', (req, res) => {
    // res.render('pages/AddBlog', {
    //     title: "AddBlog"
    // })
    matchlogin(req, res, 'Pages/AddBlog')

})

router.get('/ViewBlog', async (req, res) => {
    const blog = await Blog.find()
    res.render('pages/ViewBlog', {
        blog,
        title: "ViewBlog"
    })
})

router.get('/UpdateBlog', async (req, res) => {
    const { id } = req.query
    // console.log("id.", id);
    const blog = await Blog.findById(id)
    res.render('pages/UpdateBlog', {
        blog,
        title: "UpdateBlog"
    })
})

router.get('/register', (req, res) => {
    res.render('Pages/register')
})
router.get('/login', (req, res) => {
    res.render('Pages/login', { message: req.flash('info') })
})
router.get('/logout', (req, res) => {
    res.clearCookie('admin')
    res.redirect('/login')
})
router.get('/MyProfile', async (req, res) => {

    const cookieData = req?.cookies.admin
    const email = cookieData.email
    const singleadmin = await admin.findOne({ email })
    res.render('Pages/MyProfile', { admin: singleadmin })
})

router.get('/ChangePassword', (req, res) => {
    const email = req?.cookies.admin.email
    res.render('Pages/ChangePassword', { email })
})


module.exports = router