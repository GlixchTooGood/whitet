const apis = {
    register:require("./auth/register"),
    login:(require("./auth/login")),
    getUser:require("./stats/user"),
    packOpen:(require("./pack/packOpen"))
}

module.exports = apis;