const { Schema, model } = require("mongoose");

const common = {
    type: String,
    required: true,
    unique: true,
    trim: true,
}

const BlogSchema = new Schema({
    blog_name: {
        ...common
    },
    blog_price: {
        ...common,
        type: Number
    },
    blog_desc: {
        ...common,
        unique: false
    },
    blog_cat: {
        ...common,
    },
    blog_img: {
        ...common,
    }
})

const Blog = model('Blogs', BlogSchema)
module.exports = Blog