const express = require('express');

//[ ]: Make this as the complete route for the customer account
//[ ]: Continue this thought -> I think i can make new connections for mongodb (see the function) so if I am able to get the function variable to pass on then I can have the perms for added security.

const router = express.Router();

const { getUserProfile, updateUserProfile, updateUserPassword, loginUser, createUser, logoutUser } = require('../controllers/customerAccountController');
const validateToken = require('../middleware/tokenValidator');


router.route('/profile', validateToken).get(getUserProfile).put(updateUserProfile);
router.put('/update-password', validateToken, updateUserPassword);
router.post('/login', loginUser);
router.post('/register', createUser);
router.post('/logout', validateToken, logoutUser);


module.exports = router;



