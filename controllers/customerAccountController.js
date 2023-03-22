//[x]: Get Profile.
//[x]: Update Profile.
//[x]: Update Password.
//[ ]: How to revoke previous jwt after update?

const asyncHandler = require('express-async-handler');
const resConstants = require('../constants');
const Customer = require('../models/customerModel');
const Vendor = require('../models/vendorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// @desc    Get user profile
//! @route   GET /api/customers/profile
//FIXME @access  Public (for now)
const getUserProfile = asyncHandler(async (req, res) => {
    //jwt has ID and email
    //jwt has been verified by tokenValidator
    const user = await Customer.findById(req.user.id);
    if(user) {
        res.status(resConstants.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            deliveryAddress: user.deliveryAddress,
            whatsappNumber: user.whatsappNumber,
        });
    } else {
        res.status(resConstants.NOT_FOUND);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
//! @route   PUT /api/customers/profile
//FIXME @access  Public (for now)
const updateUserProfile = asyncHandler(async (req, res) => {
    //jwt has ID and email
    //jwt has been verified by tokenValidator
    const user = await Customer.findById(req.user.id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.deliveryAddress = req.body.deliveryAddress || user.deliveryAddress;
        user.whatsappNumber = req.body.whatsappNumber || user.whatsappNumber;
        const updatedUser = await user.save();
        let token = jwt.sign({ id: updatedUser._id, email: updatedUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(resConstants.OK).json({
            success: true,
            message: 'User updated successfully',
            token
        });
    } else {
        res.status(resConstants.NOT_FOUND);
        throw new Error('User not found');
    }
});

// @desc    Update user password
//! @route   PUT /api/customers/update-password
//FIXME @access  Public (for now)
const updateUserPassword = asyncHandler(async (req, res) => {
    //jwt has ID and email
    //jwt has been verified by tokenValidator
    //req has oldPassword and newPassword
    const user = await Customer.findById(req.user.id);
    if(user) {
        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!isMatch) {
            res.status(resConstants.BAD_REQUEST);
            throw new Error('Invalid credentials');
        }
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        const updatedUser = await user.save();
        let token = jwt.sign({ id: updatedUser._id, email: updatedUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(resConstants.OK).json({
            success: true,
            message: 'Password updated successfully',
            token
        });
    } else {
        res.status(resConstants.NOT_FOUND);
        throw new Error('User not found');
    }
});

// @desc    Login user
//! @route   POST /api/customers/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //-> Might not work. Need to test.
    

    const user = await Customer.findOne({ email });
    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'User does not exist'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token
    });
});

// @desc    Register user
//! @route   POST /api/customers/register
// @access  Public
const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, deliveryAddress, whatsappNumber, role } = req.body;

    if(!name || !email || !password || !deliveryAddress || !whatsappNumber) {
        res.status(resConstants.BAD_REQUEST);
        throw new Error('Please enter all fields');

    }

    //-> Might not work.
    

    let userAvail = await Customer.findOne({ email });
    if(userAvail) {
        res.status(resConstants.BAD_REQUEST);
        throw new Error('User already exists. Please login.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const user = await Vendor.create({ 
        name,
        email,
        password: hashedPassword,
        deliveryAddress,
        whatsappNumber,
        role
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(resConstants.CREATED).json({
        success: true,
        message: 'User created successfully',
        token
    });
});


// @desc    Logout user
//! @route   POST /api/customers/logout
//FIXME @access  Public (for now)
const logoutUser = asyncHandler(async (req, res, next) => {
    res.status(resConstants.OK).json({
        success: true,
        message: 'User logged out successfully'
    });
});



module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    loginUser,
    createUser,
    logoutUser
};