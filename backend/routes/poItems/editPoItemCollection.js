const express = require("express");
const poItemModel = require("../../models/poItems/PO_item");
const editPoItemCollection = express();

editPoItemCollection.put("/api/poItems/edit/:po_id/:_id", async (req, res) => {
    try {
        const { po_id, _id } = req.params;
        const newData = req.body; // Updated fields for the PO item

        // Assuming newData contains updated fields, you should handle them accordingly
        
        // Example code to update fields
        const updatedFields = {
            item_code: newData.item_code,
            item_name: newData.item_name,
            Purchase_qty: newData.Purchase_qty,
            Payment_Term: newData.Payment_Term,
            Inco_Term: newData.Inco_Term,
            Basic_Price: newData.Basic_Price,
            tax: newData.tax,
            amount: newData.amount,
            Delivery_Date: newData.Delivery_Date,
            updatedBy: newData.updatedBy,
            updatedAt: newData.updatedAt
            // Add more fields as needed
        };

        // Update fields in the database
        const result = await poItemModel.updateOne({ PO_id: po_id, _id: _id }, { $set: updatedFields });

        // Check if any documents were updated
        if (result.nModified === 0) {
            return res.status(404).json({ message: "No PO Items found for the specified PO ID" });
        }

        // Fetch and return the updated PO items
        const updatedPoItems = await poItemModel.findOne({ _id: _id });
        res.status(200).json(updatedPoItems);
    } catch (error) {
        console.error("Error updating PO items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = editPoItemCollection;
