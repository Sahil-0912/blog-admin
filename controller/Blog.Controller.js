const Blog = require("../model/Blog.Model")

exports.store = async (req, res) => {
    const { blog_name, blog_price, blog_desc } = req.body
    try {
        if (blog_name == "" || blog_price == "" || blog_desc == "") {
            res.json("all fields are required")
        } else {
            // console.log(req.file.filename)
            const blog = await Blog.create({
                blog_name,
                blog_price,
                blog_desc,
                blog_img: req.file.filename
            })
            if (blog) {
                // res.json("inserted")
                res.redirect('/ViewBlog')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        await Blog.findByIdAndDelete(id)
        res.json("deleted............")
    } catch (error) {
        res.json(error)
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params
        const { blog_name, blog_price, blog_desc } = req.body
        var image = ''
        if (req.file) {
            image = req.file.filename
        } else {
            image = req.body.blog_img
        }
        await Blog.findByIdAndUpdate(
            {
                _id: id
            },
            {
                blog_name, blog_price, blog_desc, blog_img: image
            })
        // res.json("updated....")
        res.redirect('/ViewBlog')
    } catch (error) {
        console.log(error);
    }

}