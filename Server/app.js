require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// app.post("/api/sync",);

connectDB();

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});