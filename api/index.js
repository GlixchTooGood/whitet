const register = require("./auth/register")
const login = require("./auth/login")
const getUser = require("./stats/user")

const apis={
    register,
    login,
    getUser,
}

module.exports = apis;