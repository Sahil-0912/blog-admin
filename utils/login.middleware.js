
exports.matchlogin = (req, res, path) => {
    const cookieData = req?.cookies?.admin
    if (!cookieData) {
        res.redirect('/login')
    } else {
        res.render(path)
    }
}

