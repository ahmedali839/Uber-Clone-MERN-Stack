import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api"

const containerStyle = {
    width: "100%",
    height: "100%"
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {

    const [currentPostition, setCurrentPosition] = useState(center)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            })
        })


        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            })
        })


        return () => navigator.geolocation.clearWatch(watchId)
    }, [])


    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords

                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                })

            })
        }

        updatePosition(); // Initiate the Position Update

        const intervalId = setInterval(updatePosition, 1000); // Update Postion after every 1 / 10 second


        return () => clearInterval(intervalId)
    }, [])




    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPostition}
                zoom={15}
            >
                <Marker position={currentPostition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking


