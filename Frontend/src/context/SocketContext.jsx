import React, { createContext, useEffect } from "react";

import { io } from "socket.io-client"; { }

export const SocketContext = createContext()

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic

        socket.on("connect", () => {
            console.log("User Connected: ", socket.id);
        })

        socket.on("disconnect", () => {
            console.log("User Disconnected: ", socket.id);
        })
    }, [])


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>

    )

}

export default SocketProvider;

