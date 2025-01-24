const router = require('express').Router()

const AdminController = require('../controller/Admin.Controller')
const upload = require('../middleware/uploadfile')
router.post('/register', AdminController.register)
router.post('/login',upload.single('admin_profile'), AdminController.login)
router.post('/updateprofile', upload.single('admin_profile'), AdminController.updateprofile)
router.post('/changepassword', AdminController.changepassword)



module.exports = router