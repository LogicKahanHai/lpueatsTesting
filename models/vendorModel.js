const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters']
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Please enter your delivery address'],
        trim: true,
        maxLength: [100, 'Your delivery address cannot exceed 100 characters']
    },
    whatsappNumber: {
        type: String,
        required: [true, 'Please enter your whatsapp number'],
        trim: true,
        maxLength: [15, 'Your whatsapp number cannot exceed 15 characters']
    },
    role: {
        type: String,
        default: 'customer'
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model('Vendor', vendorSchema);