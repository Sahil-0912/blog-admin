const admin = require('../model/Admin.Model')
const Blog = require('../model/Blog.Model')
const { matchLogin } = require('../utils/login.middleware')

const router = require('express').Router()
router.get('/', matchLogin, (req, res) => {
    // res.render('pages/index')
    res.render('Pages/index')
})
router.get('/AddBlog', matchLogin, (req, res) => {
    // res.render('pages/AddBlog', {
    //     title: "AddBlog"
    // })
    res.render('Pages/AddBlog')

})

router.get('/ViewBlog', matchLogin, async (req, res) => {
    const blog = await Blog.find()
    res.render('pages/ViewBlog', {
        blog,
        title: "ViewBlog"
    })
})

router.get('/UpdateBlog', matchLogin, async (req, res) => {
    const { id } = req.query
    // console.log("id.", id);
    const blog = await Blog.findById(id)
    res.render('pages/UpdateBlog', {
        blog,
        title: "UpdateBlog"
    })
})

router.get('/register', (req, res) => {
    res.render('Pages/register', { message: req.flash('info') })
})
router.get('/login', (req, res) => {
    res.render('Pages/login', { message: req.flash('info') })
})
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})
router.get('/MyProfile', async (req, res) => {
    const email = req.user.email
    const singleadmin = await admin.findOne({ email })
    res.render('Pages/MyProfile', { admin: singleadmin })
})

router.get('/ChangePassword', (req, res) => {
    const email = req?.user?.email
    res.render('Pages/ChangePassword', { email })
})

router.get('/updatepassword', async (req, res) => {
    res.render('Pages/updatepassword', { message: req.flash("info") })
})


module.exports = router