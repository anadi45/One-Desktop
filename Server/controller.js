const {Product} = require("./models/product");

const syncWithCloud = async function (req,res) {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {syncWithCloud}