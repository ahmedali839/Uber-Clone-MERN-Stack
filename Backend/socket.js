const socket = require("socket.io")
const userModel = require("./models/User.model")
const captainModel = require("./models/captain.model")

let io;

function initializeSocket(server) {

    io = socket(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: `, socket.id)

        socket.on("join", async (data) => {

            const { userType, userId } = data;
            console.log(`socket connected with frontend with userId: ${userId} and type: ${userType}`)

            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })

            }
        })


        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", { message: "Invalid or incomplete location" })
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng,
                }
            })


        });




        socket.on("diconnect", () => {
            console.log(`User disconnected: `, socket.id)
        });
    });

}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data)
    } else {
        console.log("Socket not Initialized.")
    }
}

module.exports = { sendMessageToSocketId, initializeSocket }