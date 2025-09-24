const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minLength: [3, "First must be at least 3 characters long"],
        },

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@|S+|.|S+$/, "Please enter Valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters. "]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters. "]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },

    },

})

captainSchema.methods.generateAuthToken = function () {
    const Token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return Token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model("captain", captainSchema)

module.exports = captainModel;

