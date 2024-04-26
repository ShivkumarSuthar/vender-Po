const express = require("express");
const po_itemModel = require("../../models/poItems/PO_item");
const po_item = express();


// POST route for creating purchase order items
po_item.post("/add", async (req, res) => {
    try {

        const { PO_id, createdBy,  itemCode, itemName, purchaseQty, paymentTerm, incoTerm, basicPrice, tax, amount, deliveryDate } = req.body;
        
        // Create PO item in the database
        const poItemData = await po_itemModel.create({
            item_code: itemCode,
            item_name: itemName,
            Purchase_qty: purchaseQty,
            Payment_Term: paymentTerm,
            Inco_Term: incoTerm,
            Basic_Price: basicPrice,
            tax: tax,
            amount: amount,
            Delivery_Date: deliveryDate,
            PO_id: PO_id,
            createdBy: createdBy,
            
        });
        res.status(201).send([{ poItemData }, { message: "Successfully created!" }]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
});

module.exports = po_item;
