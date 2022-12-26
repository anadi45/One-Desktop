const electron = require("electron");
const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function nameGenerator(prod_name) {
    const date = (new Date()).toISOString();
    let name = prod_name + "-" + date;
    name = name.replace(":", "");
    return name;
}

app.listen(8080, function () {
    console.log('Your application is listening on port 8080!');
});

app.get('/', function (req, res) {
    try {
        res.sendFile(__dirname + "/index.html");
    } catch (error) {
        console.error(error);
    }
});

app.get("/inventory", function (req, res) {
    try {
        res.sendFile(__dirname + "/windows/inventory.html")
    } catch (error) {
        console.error(error);
    }
});

app.post("/inventory", function (req, res) {
    try {
        const savePath = path.join((electron.app || electron.remote.app).getPath('userData'), `/saveFiles/${nameGenerator(req.body.prod_name)}`);
        const dir = path.join((electron.app || electron.remote.app).getPath('userData'), "saveFiles")
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        fs.writeFileSync(savePath, JSON.stringify(req.body));
        res.redirect("/")
    } catch (error) {
        console.error(error);
    }
});

module.exports = app;