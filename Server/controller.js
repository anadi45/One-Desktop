const mongoose = require("mongoose");
const { Product } = require("./models/product");

const syncWithCloud = async function (req, res) {
    try {
        const { _id, prod_name, prod_flav, prod_weight, prod_dop, prod_quant, prod_price, prod_disc, prod_mrp, prod_exp } = req.body;
        const newProd = new Product({
            _id: _id,
            name: prod_name,
            flavor: prod_flav,
            weight: prod_weight,
            dateOfPurchase: new Date(prod_dop),
            quantity: prod_quant,
            price: prod_price,
            discount: prod_disc,
            mrp: prod_mrp,
            dateOfExpiry: new Date(prod_exp)
        });
        const sync = await newProd.save();
        if (sync) {
            res.send({
                message: "Sync Successfull"
            });
        } else {
            res.send({
                message: "Sync Failed"
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            message: "Sync Failed"
        });
    }
}

module.exports = { syncWithCloud }