const express = require("express");
const PoData = require("../../models/PO/PO");
const PoPost = express();

PoPost.use(express.json());
PoPost.use(express.urlencoded({ extended: true }));

PoPost.post("/add", async (req, res) => {
    try {
        const {
            DOC,
            Material_delivery_address,
            remark,
            insurance,
            insurance_tax,
            packing_Formawading,
            packing_tax,
            trasnportation,
            trasnportation_tax,
            other_charges,
            others_tax,
            vender_name,
            vender_code,
            createdBy
        } = req.body;

        const generatePoNo = async () => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear().toString().slice(-2); // Extract last two digits of the year
            const nextYear = parseInt(currentYear) + 1; // Increment for next year
        
            const lastPo = await PoData.findOne({}, {}, { sort: { Po_no: -1 } }); // Get the last PO
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
        

        const po_no = await generatePoNo(); // Generate the PO number

        const Po = await PoData.create({
            Po_no: po_no,
            DOC: DOC,
            Material_delivery_address: Material_delivery_address,
        remark: remark,
            insurance: insurance,
            insurance_tax: insurance_tax,
            packing_Formawading: packing_Formawading,
            packing_tax: packing_tax,
            fright_or_trasnportation: trasnportation,
            trasnportation_tax: trasnportation_tax,
            other_charges: other_charges,
            others_tax: others_tax,
            createdBy: createdBy,
            vender_code: vender_code,
            vender_name: vender_name
        });

        res.status(201).send(Po);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error" + e);
    }
});

module.exports = PoPost;
