const bcrypt = require("bcryptjs");

function hash (pass) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(pass, salt)
    return hashed
}

function compare (uPass, dbPass) {
    const compared = bcrypt.compareSync(uPass, dbPass)
    return compared
}

module.exports = {
    hash,
    compare
}