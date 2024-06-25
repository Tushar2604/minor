const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Login-tut', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check database connected or not
connect.then(() => {
    console.log('Database Connected Successfully');
}).catch((error) => {
    console.error('Database cannot be Connected:', error);
});

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = mongoose.model('users', Loginschema);

module.exports = collection;
