const mongoose = require('mongoose');
const env = require('dotenv').config();

const userDBConnection = async () => {
    const userDB = await mongoose.connect(`${process.env.MONGO_URI_USERDB}`);

}

const kioskDBConnection = async () => {
    const kioskDb = await mongoose.connect(`${process.env.MONGO_URI_USERDB}`);
    console.log('MongoDB connected');
    console.log(`MongoDB connected to ${kioskDb.connection.host}`);
    console.log(`MongoDB name: ${kioskDb.connection.name}`);
}


module.exports = {
    userDBConnection,
    kioskDBConnection
};
