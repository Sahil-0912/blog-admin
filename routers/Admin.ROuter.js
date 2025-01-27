const router = require('express').Router()

const sendemail = require('../config/mail')
const AdminController = require('../controller/Admin.Controller')
const upload = require('../middleware/uploadfile')
router.post('/register', AdminController.register)
router.post('/login', upload.single('admin_profile'), AdminController.login)
router.post('/updateprofile', upload.single('admin_profile'), AdminController.updateprofile)
router.post('/changepassword', AdminController.changepassword)
router.post('/forgetpassword', AdminController.forgetpassword)


// router.get('/sendemail', async (req, res) => {
//     await sendemail('sahilvaghela975@gmail.com',"test the mail")
// })



module.exports = router