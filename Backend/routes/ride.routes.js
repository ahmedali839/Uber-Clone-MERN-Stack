const express = require("express")
const router = express.Router()
const { body, query } = require("express-validator")
const { createRides, getFare, confirmRide, startRide, endRide } = require("../controllers/ride.controller.js")
const { authUser, authCaptain } = require("../middlewares/auth.middleware.js")

router.post("/create",
    authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("Invalid vehicle Type")
    , createRides)


router.get("/get-fare",
    authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    // query("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("Invalid vehicle Type")
    getFare)



router.post("/confirm",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
    confirmRide)

router.get("/start-ride",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
    body("otp").isString().isLength({ min: 6, max: 6 }).withMessage("Invalid otp"),
    startRide)

router.post("/end-ride",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
    endRide)




module.exports = router