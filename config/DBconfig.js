const mongoose = require ('mongoose');

mongoose.connect(process.env.mongo_url);
const db = mongoose.connection;
db.on("connected", () =>{
    console.log("Mongo DB connection Successful.");
});

db.on("error", () =>{
    console.log("Mongo DB connection failed.");
});
