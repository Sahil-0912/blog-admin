const admin = require("../model/Admin.Model")
const { PlaintoHash, HashToPlain } = require("../utils/password")

exports.register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, email, password, confirm_password } = req.body
        const existemail = await admin.findOne({ email: email }).countDocuments().exec()
        if (existemail > 0) {
            res.json("Email is allready exist")
        } else {
            const hash = await PlaintoHash(password)
            const Admin = await admin.create({ username, email, password: hash, confirm_password })
            // res.josn({
            //     success: true,
            //     message: "Inserted.........."
            // })
            res.redirect('/login')
        }

    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const existemail = await admin.findOne({ email }).countDocuments().exec()
        if (existemail > 0) {
            const exisstuser = await admin.findOne({ email })
            console.log(exisstuser);

            const matchpwd = await HashToPlain(password, exisstuser.password)
            if (matchpwd) {
                const payload = {
                    username: exisstuser.username,
                    email: exisstuser.email,
                    admin_profile: exisstuser.req?.file.filename
                }
                res.cookie('admin', payload, { httpOnly: true })
                res.redirect('/')
            } else {
                res.json("password did not matched..")
            }

        } else {
            res.json("email id is not exist....")
        }
    } catch (error) {
        console.log(error);

    }
}

exports.updateprofile = async (req, res) => {
    try {
        const { email, username } = req.body
        const existemail = await admin.findOne({ email }).countDocuments().exec()
        if (existemail > 0) {
            await admin.updateOne(
                {
                    email: email
                },
                {
                    username,
                    admin_profile: req.file.filename
                }
            )
            res.redirect('/MyProfile')
        } else {
            res.json("email id not exist")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.changepassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, new_pass, confirm_pass } = req.body
        const existemail = await admin.findOne({ email }).countDocuments().exec()

        if (existemail > 0) {
            const Admin = await admin.findOne({ email })
            const match = await HashToPlain(password, Admin.password)

            if (match) {
                console.log(new_pass);
                console.log(confirm_pass);
                if (new_pass === confirm_pass) {
                    const hash = await PlaintoHash(new_pass)
                    await admin.updateOne(
                        {
                            email: email
                        },
                        {
                            password: hash
                        }
                    )
                    res.redirect('/ChangePassword')
                } else {
                    res.json("new_pass does not match");
                }
            } else {
                res.josn("password dose not match")
            }
        } else {
            res.json("email id not exist")
        }
    } catch (error) {
        console.log(error);
    }
}
