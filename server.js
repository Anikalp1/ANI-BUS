const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const dbConfig = require("./config/dbConfig");
var cors = require("cors");
const path = require("path");
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "localhost", "127.0.0.1"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "./client/build")));

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/buses", busesRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.listen(port, () => console.log(`Node server Listening on port ${port}`));
