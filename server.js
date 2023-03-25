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

const homeString = `
{
    message: Welcome to the LPUEats API,
    version: 0.0.1,
    api_routes_currently_up: {
        register: /api/dev/customers/register,
        login: /api/dev/customers/login,
        logout: /api/dev/customers/logout,
        profile: /api/dev/customers/profile,
        updatePassword: /api/dev/customers/password
    }
}`

var homeRes = JSON.stringify(JSON.parse(homeString), null, 2);

app.get('/', (req, res) => {
    res.send(homeRes);
});

kioskDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
app.use(express.json());
app.use('/api/dev/customers', require('./routes/customerAccountRoute'));

app.use(errorHandler);


