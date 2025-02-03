const admin = require('../model/Admin.Model')
const { HashToPlain } = require('../utils/password')

const LocalStrategy = require('passport-local').Strategy
module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const Admin = await admin.findOne({ email })
        if (!Admin) {
            return done(null, false, console.log("user not found"))
        }

        const match = await HashToPlain(password,Admin.password)
        if (!match) {
            return done(null, false, console.log("password not match"))
        }
        return done(null, Admin)

    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);//to store user id in session
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const Admin = await admin.findById(id)
            done(null, Admin)//retrieve full user oject
        } catch (error) {
            console.log(error)
        }
    });
}