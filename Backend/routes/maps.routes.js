const express = require("express");
const { getCordinates, getAutoCompleteSuggestions, getDistances } = require("../controllers/maps.controller.js");
const { authUser } = require("../middlewares/auth.middleware.js");
const { query, validationResult } = require("express-validator");
const router = express.Router()


router.get("/get-coordinates",
    query("address").isString().isLength({ min: 3 }),
    authUser, getCordinates
);


router.get("/get-distance-time",
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    authUser, getDistances
);


router.get("/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    authUser, getAutoCompleteSuggestions
);


module.exports = router;