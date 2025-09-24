const userModel = require("../models/User.model");
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    // Just for checking user confirmed Logout OR still have access with token ? 
    const isBlackListed = await blackListTokenModel.findOne({ token: token })
    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized access" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user;
        return next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Unauthorized" })
    }


    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        return next();

    } catch (err) {
        res.status(401).json({ message: "Unauthorized" })
    }

}