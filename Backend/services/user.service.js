const userModel = require("../models/User.model");

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !password || !email) {
        throw new Error("All fields are required three fields");
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname,
        }, 
        email,
        password
    })

    return user;
}

