const { default: mongoose } = require("mongoose")

exports.dbconnect = () => {
    mongoose.connect('mongodb://localhost:27017/blog-pr')
        .then(() => { console.log("db connected 👍") })
        .catch((err) => { console.log(err) })
}