const mongoose = require('mongoose');
const env = require('dotenv');

const userDBConnection = async () => {
    const db = await mongoose.connect(`${process.env.MONGO_URI_USERDB}`);
    console.log('MongoDB connected');  
    console.log(`MongoDB connected to ${db.connection.host}`);
    console.log(`MongoDB name: ${db.connection.name}`);
}

const kioskDBConnection = async () => {
    const db = await mongoose.connect(`${process.env.MONGO_URI_KIOSKDB}`);
    console.log('MongoDB connected');
    console.log(`MongoDB connected to ${db.connection.host}`);
    console.log(`MongoDB name: ${db.connection.name}`);
}


module.exports = {
    userDBConnection,
    kioskDBConnection
};
