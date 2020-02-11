const dbname = "dbname";
const dbpass = "admin";
const mongodb = "mongodb+srv://"+dbname+":"+dbpass+"@cluster0-89lk4.azure.mongodb.net/post";

//const azmongoDB = "mongodb://agostinhoramos:VUUKW3X2YVKVLLc2ovif70mGtl5vtMbv7WBJsngRWvRsmGQbcYg1xfVikbSKF1AaEer0pjNUXcRr9aMryQsoqw==@agostinhoramos.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

module.exports = {
    mongoURI: mongodb
};
