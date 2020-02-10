const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true        
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("user", schema);