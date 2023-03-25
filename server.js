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
    res.send(
        `message: Welcome to the LPUEats API,\n
        version: 0.0.1,\n
        api_routes_currently_up: {\n\t
            register: /api/dev/customers/register,\n\t
            login: /api/dev/customers/login,\n\t
            logout: /api/dev/customers/logout,\n\t
            profile: /api/dev/customers/profile,\n\t
            updatePassword: /api/dev/customers/password\n
        }`
    )
});

kioskDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
app.use(express.json());
app.use('/api/dev/customers', require('./routes/customerAccountRoute'));

app.use(errorHandler);


