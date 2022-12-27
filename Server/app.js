require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

const {syncWithCloud} = require("./controller");

app.post("/api/sync",syncWithCloud);

connectDB();

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});