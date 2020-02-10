const mongoose = require("mongoose");

const dbuser = "dbname";
const dbpass = "admin";

const mongoURI = "mongodb+srv://"+dbuser+":"+dbpass+"@cluster0-89lk4.azure.mongodb.net/test?retryWrites=true&w=majority";

const InitiateMongoServer = async() => {
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser:true
        });
        console.log("Connected to DB!!");
    } catch(e){
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;