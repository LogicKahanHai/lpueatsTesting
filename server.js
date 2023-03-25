//[ ]: How to hide the password in the connection string and other sensitive data.


const express = require('express');
const {userDBConnection, kioskDBConnection} = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const env = require('dotenv').config();  

const app = express();

const port = process.env.PORT || 3000;

//kioskDBConnection();
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send().json({
        message: 'Welcome to the LPUEats API',
        version: '0.0.1',
        api_routes_currently_up: {
            register: '/api/dev/customers/register',
            login: '/api/dev/customers/login',
            logout: '/api/dev/customers/logout',
            profile: '/api/dev/customers/profile',
            updatePassword: '/api/dev/customers/password'
        }
    });
});

kioskDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
app.use(express.json());
app.use('/api/dev/customers', require('./routes/customerAccountRoute'));

app.use(errorHandler);


