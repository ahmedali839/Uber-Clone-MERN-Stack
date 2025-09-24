const express = require("express")
const router = express.Router();
const captainController = require("../controllers/captain.controller")
const { body } = require("express-validator")
const authMiddlewares = require("../middlewares/auth.middleware")

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage('First name must be at least 3 characters.'),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be at least 3 characters"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Capacity must be at least 1 character"),
    body("vehicle.vehicleType").isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid vehicleType"),
],
    captainController.registerCaptain
)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
],
    captainController.loginCaptain
)

router.get("/profile", authMiddlewares.authCaptain, captainController.getCaptainProfile)

router.get("/logout", authMiddlewares.authCaptain, captainController.logoutCaptain)

module.exports = router;  