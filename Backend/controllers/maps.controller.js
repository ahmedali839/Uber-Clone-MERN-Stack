const { getAddressCordinate, getDistanceTime, getAutoCompleteSuggestions } = require("../services/maps.service.js")
const { validationResult } = require("express-validator")


module.exports.getCordinates = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCordinate(address)
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }


}

module.exports.getDistances = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await getDistance(origin, destination)
        res.status(200).json(distanceTime)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    if (!input) {
        return res.status(400).json({ message: "Input query parameter is required" });
    }

    try {
        // Assuming you have a function in maps.service.js called getAutoCompleteSuggestions
        const suggestions = await getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}