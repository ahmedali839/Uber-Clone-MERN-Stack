const mongoose = require("mongoose")

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain",
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending",
    },
    duration: {
        type: Number,
    }, // in seconds
    distance: {
        type: Number,
    }, // in metres
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
    }
})

const rideModel = mongoose.model("ride", rideSchema)
module.exports = rideModel