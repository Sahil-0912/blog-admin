
// exports.matchlogin = (req, res, path) => {
//     const cookieData = req?.cookies?.admin
//     if (!cookieData) {
//         res.redirect('/login')
//     } else {
//         res.render(path)
//     }
// }



exports.matchLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}