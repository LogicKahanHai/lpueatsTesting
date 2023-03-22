const mongoose = require('mongoose');

const kioskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Kiosk name'],
        trim: true,
        maxLength: [30, 'Kiosk name cannot exceed 30 characters'],
    },
    kiosk_id: {
        type: String,
        required: [true, 'Please enter Kiosk ID'],
        trim: true,
        maxLength: [30, 'Kiosk ID cannot exceed 30 characters'],
    },
    address: {
        type: String,
        required: [true, 'Please enter Kiosk address'],
        trim: true,
        maxLength: [100, 'Kiosk address cannot exceed 100 characters'],
    },
    isOperating: {
        type: Boolean,
        default: false,
    },
    menu: {
        type: Map,
        of: String,
    },
});

module.exports = mongoose.model('Kiosks', kioskSchema);