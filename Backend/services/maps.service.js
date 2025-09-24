const axios = require("axios")
const captainModel = require("../models/captain.model")


module.exports.getAddressCordinate = async (address) => {

    // Store your API key in env
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url)

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error("Unable to fetch Cordinate");
        }

    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports.getDistanceTime = async function (origin, destination) {
    if (!origin || !destination) {
        throw new Error("Origin and destination both are required.");
    };


    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url)
        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
                throw new Error("routes not found");
            }

            return response.data.rows[0].elements[0]
        } else {
            throw new Error("Unable to fetch distance and time.");
        }
    } catch (error) {
        console.error("error while getDistance controller: ", error);
        throw error;
    }

}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required.");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;


    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions;
        } else {
            throw new Error("Unable to fetch autocomplete suggestions.");
        }

    } catch (error) {
        console.error("Error while getting location Suggestions service.", error);
        throw new Error("Internal server error.");
    }


}


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in KM

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });
    return captains;

}