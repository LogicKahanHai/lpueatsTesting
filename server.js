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
    res.send(`{<br/>
        "message": "Welcome to the Kiosk API",<br/>
        "version": "0.0.1",<br/>
        "routes": {<br/>&emsp;&emsp;
            "profile": "/api/dev/customers/profile",<br/>&emsp;&emsp;
            "register": "/api/dev/customers/register",<br/>&emsp;&emsp;
            "login": "/api/dev/customers/login",<br/>&emsp;&emsp;
            "logout": "/api/dev/customers/logout",<br/>&emsp;&emsp;
            "updatePassword": "/api/dev/customers/password",<br/>&emsp;&emsp;
        }<br/>


    }`);
});

kioskDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
app.use(express.json());
app.use('/api/dev/customers', require('./routes/customerAccountRoute'));

app.use(errorHandler);


