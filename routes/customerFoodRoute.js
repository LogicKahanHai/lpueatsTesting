//[ ]: Add Cart Functionality.
//[ ]: Update Profile.
//[ ]: Get Menu.
//[ ]: Get Kiosks.
//[ ]: Get Previous Orders.

const express = require('express');
const router = express.Router();

const customerFoodController = require('../controllers/customerFoodController');


router.route('/').get(userController.getKiosks);