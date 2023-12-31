const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require ('express');
const dbConfig = require("./config/dbConfig");

const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(express.json())

const usersRoute = require('./routes/usersRoute')
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require("./routes/bookingsRoute")

app.use("/api/buses", busesRoute);
app.use('/api/users', usersRoute);
app.use("/api/bookings", bookingsRoute);
app.listen(port, () => console.log(`Node server Listening on port ${port}`));

