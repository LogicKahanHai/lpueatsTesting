const asyncHandler = require('express-async-handler');
const { kioskDBConnection } = require('../config/dbConnection');
const resConstants = require('../constants');
const Kiosks = require('../models/kioskModel');

//@desc   Get all kiosks
//!@route GET /api/kiosks
//FIXME @access  Public (for now)
const getKioks = asyncHandler(async (req, res) => {
    await kioskDBConnection();
    const kiosks = await Kiosks.find({});
    if(!kiosks) {
        res.status(resConstants.NOT_FOUND);
        throw new Error('No kiosks found at the moment! We are working on bringing you the best service.');
    }
    
    res.json(kiosks);
});