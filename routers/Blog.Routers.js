const router = require('express').Router()

const BlogContoller = require('../controller/Blog.Controller')
const upload = require('../middleware/uploadfile')

router.post('/', upload.single('blog_img'), BlogContoller.store)
router.get('/:id', BlogContoller.trash)
router.post('/:id', upload.single('blog_img'), BlogContoller.edit)

module.exports = router