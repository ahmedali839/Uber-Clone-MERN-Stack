const { createRide, getFare, confirmRide, startRide, endRide } = require("../services/ride.service.js")
const { validationResult } = require("express-validator")
const { getCaptainsInTheRadius, getAddressCordinate } = require("../services/maps.service.js")
const { sendMessageToSocketId } = require("../socket.js")
const rideModel = require("../models/ride.model.js")


module.exports.createRides = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination, vehicleType } = req.body;


    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType })
        res.status(200).json(ride)


        const pickupCordinates = await getAddressCordinate(pickup)


        const captainsInTheRadius = await getCaptainsInTheRadius(pickupCordinates.ltd, pickupCordinates.lng, 2)

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user")

        captainsInTheRadius.map((captains) => {
            sendMessageToSocketId(captains.socketId, {
                event: "new-ride",
                data: rideWithUser
                // data:captains
            })
        })


    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }


}

module.exports.getFare = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination)
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }



}

module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult("req")
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain })
        
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({ message: "Ride not being confirmed", ride })
    }
    
    
}

module.exports.startRide = async (req, res, next) => {
    const errors = validationResult("req")
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }
    
    // const { userId, otp } = req.body;
    const { rideId, otp } = req.query;
    
    try {
        const ride = await startRide({ rideId, otp, captain: req.captain._id })

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride
        })
        
        return res.status(200).json({ ride })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    
    
}

module.exports.endRide = async (req, res, next) => {
    const errors = validationResult("req")
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    }
    
    const { rideId } = req.body;
    
    try {
        const ride = await endRide({ rideId, captain: req.captain })
        


        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-ended",
            data: ride
        })

        return res.status(200).json(ride)

    } catch (error) {
        return res.status(501).json({ message: error.message })

    }
}