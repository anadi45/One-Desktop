const electron = require("electron");
const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function nameGenerator(prod_name) {
    const dateObj = new Date();
    let date = dateObj.getUTCDate();
    let month = dateObj.getUTCMonth() + 1;
    let year = dateObj.getUTCFullYear();
    let name = prod_name + "-" + date + "-" + month + "-" + year;
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

app.get("/updateInventory", function (req, res) {
    try {
        res.sendFile(__dirname + "/windows/updateInventory.html");
    } catch (error) {
        console.error(error);
    }
});

app.post("/updateInventory", function (req, res) {
    try {
        const savePath = (electron.app || electron.remote.app).getPath('userData') + `/saveFiles/${nameGenerator(req.body.prod_name)}.json`;
        const dir = path.join((electron.app || electron.remote.app).getPath('userData'), "saveFiles");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        let data = JSON.stringify({...req.body,synced: false});

        fs.writeFileSync(savePath, data);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
});

app.get("/billing", function (req, res) {
    try {
        res.sendFile(__dirname + "/windows/billing.html");
    } catch (error) {
        console.error(error);
    }
});

app.get("/cloud", function (req, res) {
    try {
        res.sendFile(__dirname + "/windows/cloud.html");
    } catch (error) {
        console.error(error);
    }
});

app.get("/expireProducts", function (req, res) {
    try {
        res.sendFile(__dirname + "/windows/expireProducts.html");
    } catch (error) {
        console.error(error);
    }
});

app.get("/expireProductsList", function (req, res) {
    try {
        const dir = path.join((electron.app || electron.remote.app).getPath('userData'), "saveFiles");
        const expDate = new Date(); 
        expDate.setDate(expDate.getDate() + 30);
        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(err);
            }
            let data = [];
            files.forEach(file => {
                const content = fs.readFileSync(dir + "/" + file);
                prod_exp = new Date(JSON.parse(content).prod_exp)
                if(prod_exp < expDate) {
                    data.push(JSON.parse(content));
                }                
            });
            res.send(data);
        });
    } catch (error) {
        console.error(error);
    }
})
module.exports = app;