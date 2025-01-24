const bcrypt = require('bcryptjs');

exports.PlaintoHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashpwd = await bcrypt.hash(password, salt)
    console.log(hashpwd);
    return hashpwd
}

exports.HashToPlain = async (password, hashpwd) => {
    const output = await bcrypt.compare(password, hashpwd)
    return output
}