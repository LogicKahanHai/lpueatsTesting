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
    if(req.headers['user-agent'].includes('PostmanRuntime')) {
        return res.json(
            {
                "message": "Welcome to the LPUEats API",
                "version": "0.0.1",
                "routes_ready_for_testing": {
                    "profile": "/api/dev/customers/profile",
                    "register": "/api/dev/customers/register",
                    "login": "/api/dev/customers/login",
                    "logout": "/api/dev/customers/logout",
                    "updatePassword": "/api/dev/customers/password",
                }
            }
        );
    }
    res.send(`{<br/>&emsp;
        "message": "Welcome to the LPUEats API",<br/>&emsp;
        "version": "0.0.1",<br/>&emsp;
        "routes_ready_for_testing": {<br/>&emsp;&emsp;
            "profile": "/api/dev/customers/profile",<br/>&emsp;&emsp;
            "register": "/api/dev/customers/register",<br/>&emsp;&emsp;
            "login": "/api/dev/customers/login",<br/>&emsp;&emsp;
            "logout": "/api/dev/customers/logout",<br/>&emsp;&emsp;
            "updatePassword": "/api/dev/customers/password",<br/>&emsp;
        }<br/>


    }`)
});

kioskDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
app.use(express.json());
app.use('/api/dev/customers', require('./routes/customerAccountRoute'));

app.use(errorHandler);


