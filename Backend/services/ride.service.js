const rideModel = require("../models/ride.model.js")
const crypto = require("crypto")
const { getDistanceTime } = require("../services/maps.service.js");
const { sendMessageToSocketId } = require("../socket.js");


async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required.")
    }

    const distanceTime = await getDistanceTime(pickup, destination);


    // Example fare calculation rates (can be adjusted)
    const rates = {
        auto: 10,        // per km
        car: 15,         // per km
        motorcycle: 8    // per km
    };

    const distanceKm = distanceTime.distance.value / 1000; // assuming distance in meters

    const fares = {
        auto: Math.round(distanceKm * rates.auto),
        car: Math.round(distanceKm * rates.car),
        motorcycle: Math.round(distanceKm * rates.motorcycle)
    };

    return fares;

}

module.exports.getFare = getFare

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()
        return otp;
    }

    return generateOtp(num);
}


module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("User, pickup, destination, and vehicleType are required.");
    }

    // Calculate fare
    const fares = await getFare(pickup, destination);
    const fare = fares[vehicleType];
    if (fare === undefined) {
        throw new Error("Invalid vehicle type.");
    }



    // Create ride document
    const ride = await rideModel.create({
        user: user,
        pickup,
        destination,
        fare,
        otp: getOtp(6)
        // vehicleType,
        // status: "requested",
        // requestedAt: new Date()
    });

    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("rideId is required.")
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: "accepted",
        captain: captain._id
    })


    const ride = rideModel.findOne({
        _id: rideId
    }).populate("user").populate("captain").select("+otp")


    if (!ride) {
        throw new Error("Ride not found")
    }
    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {

    if (!rideId || !otp) {
        throw new Error("Ride Id and otp are required")
    }


    const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp")


    if (!ride) {
        throw new Error("Ride not found")
    }

    if (ride.status !== "accepted") {
        throw new Error("Ride not accepted")
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid otp")
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,

    }, {
        status: "ongoing"
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("ride is requiredF")
    }
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate("user").populate("captain").select("+otp")


    if (!ride) {
        throw new Error("Ride not found")
    }

    if (ride.status !== "ongoing") {
        throw new Error("Ride not ongoing")
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: "completed"
    })

    return ride;

}