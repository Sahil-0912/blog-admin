const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
    blog_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blog_price: {
        type: String,
        required: true,
        trim: true
    },
    blog_desc: {
        type: String,
        required: true,
        trim: true
    },
    blog_img: {
        type: String
    }
}, {
    timestamps: true
})

const Blog = model('Blogs', BlogSchema)
module.exports = Blog