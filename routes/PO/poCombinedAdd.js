const express = require('express');
const multer = require('multer');
const poItemModel = require("../../models/poItems/PO_item");
const PoModel = require("../../models/PO/PO");
const PoItemsDocs = require("../../models/poItems/file");
const moment = require('moment/moment');

const combinedRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('YYYY-MM-DD-HH-mm-ss') + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

const generatePoNo = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().slice(-2); // Extract last two digits of the year
    const nextYear = parseInt(currentYear) + 1; // Increment for next year

    const lastPo = await PoModel.findOne({}, {}, { sort: { Po_no: -1 } }); // Get the last PO
    let nextPoNumber = `RCTPLPO${currentYear}${nextYear}0001`; // Default PO number if no POs exist

    if (lastPo) {
        const lastPoNumber = lastPo.Po_no;
        if (lastPoNumber) {
            const poCounter = parseInt(lastPoNumber.substring(12)) + 1; // Extract counter part and increment
            nextPoNumber = `RCTPLPO${currentYear}${nextYear}${poCounter.toString().padStart(4, "0")}`; // Format the new PO number
        }
    }

    return nextPoNumber;
};

combinedRouter.post("/AddPo", upload.array('POFiles'), async (req, res) => {
    try {
        const { poDataObject, poItems } = req.body;
        const formData = req.files; // Get uploaded files from request

        const po_no = await generatePoNo();

        const poDatas = JSON.parse(poDataObject);
        const poData = await PoModel.create({
            Po_no: po_no,
            DOC: poDatas.DOC,
            Material_delivery_address: poDatas.Material_delivery_address,
            remark: poDatas.remark,
            insurance: poDatas.insurance,
            insurance_tax: poDatas.insurance_tax,
            packing_Formawading: poDatas.packing_Formawading,
            packing_tax: poDatas.packing_tax,
            fright_or_trasnportation: poDatas.trasnportation,
            trasnportation_tax: poDatas.trasnportation_tax,
            other_charges: poDatas.other_charges,
            others_tax: poDatas.others_tax,
            vender_name: poDatas.vender_name,
            vender_code: poDatas.vender_code,
            term_Condition: poDatas.term_condition,
            createdBy: poDatas.createdBy
        });

        const poItemsData = JSON.parse(poItems);
        for (let i = 0; i < poItemsData.length; i++) {
            const poItem = await poItemModel.create({
                item_code: poItemsData[i].itemCode,
                item_name: poItemsData[i].itemName,
                Purchase_qty: poItemsData[i].purchaseQty,
                Payment_Term: poItemsData[i].paymentTerm,
                Inco_Term: poItemsData[i].incoTerm,
                Basic_Price: poItemsData[i].basicPrice,
                tax: poItemsData[i].tax,
                amount: poItemsData[i].amount,
                Delivery_Date: poItemsData[i].deliveryDate,
                PO_id: poData._id, // Using the newly created Purchase Order ID
                createdBy: poItemsData[i].createdBy
            });
        }

        const files = formData.map(file => ({
            filename: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            destination: file.destination,
            path: file.path,
        }));
        const poItemsDocs = new PoItemsDocs({ files: files, PO_Id: poData._id });
        await poItemsDocs.save();

        res.status(200).json({
            PoData: poData,
            poItemsList: poItemsData,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = combinedRouter;
