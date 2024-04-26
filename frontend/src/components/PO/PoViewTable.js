import React, { useEffect, useState } from "react";

function PoViewTable({
  // POId,
  // vender_id,
  remark,
  poData,
  // userData,
  poItemData,
}) {
  const [packingtax, setPackingTax] = useState(0);
  const [Other_Charges, setOther_Charge] = useState(0);
  const [Transportation, seTransportation] = useState(0);
  const [Insurance, setInsurance] = useState(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [InsuranceWithTax, setInsuranceWithTax] = useState(0);
  const [PackingWithTax, setPackingWithTax] = useState(0);
  const [TransportationWithTax, setTransportationWithTax] = useState(0);
  const [OtherWithTax, setOtherWithTax] = useState(0);

  useEffect(() => {
    let totalTax = 0;
    let totalAmount = 0;
    poItemData.forEach((item) => {
      totalTax += (parseInt(item.amount) * parseInt(item.tax)) / 100;
      totalAmount += parseInt(item.amount);
    });
    setTotalTaxAmount(totalTax);
    setGrandTotal(totalAmount);
  }, [poItemData]);

  useEffect(() => {
    if (poData) {
      setPackingTax((poData.packing_Formawading ? poData.packing_Formawading : 0) + (poData.packing_Formawading * poData.packing_tax) / 100);
      seTransportation(
        (poData.fright_or_trasnportation ? poData.fright_or_trasnportation : 0) + (poData.fright_or_trasnportation * poData.trasnportation_tax) / 100
      );
      setOther_Charge((poData.other_charges ? poData.other_charges : 0) + (poData.other_charges * poData.others_tax) / 100);
      setInsurance((poData.insurance ? poData.insurance : 0) + (poData.insurance * poData.insurance_tax) / 100);
    }
    setPackingWithTax(
      parseInt(poData.packing_Formawading ? poData.packing_Formawading : 0) +
      (parseInt(poData.packing_Formawading ? poData.packing_Formawading : 0) * parseInt(poData.packing_tax ? poData.packing_tax : 0)) /
      100
    );

    setOtherWithTax(
      parseInt(poData.other_charges ? poData.other_charges : 0) +
      (parseInt(poData.other_charges ? poData.other_charges : 0) * parseInt(poData.others_tax ? poData.others_tax : 0)) / 100
    );

    setInsuranceWithTax(
      parseInt(poData.insurance ? poData.insurance : 0) +
      (parseInt(poData.insurance ? poData.insurance : 0) * parseInt(poData.insurance_tax ? poData.insurance_tax : 0)) / 100
    );
    setTransportationWithTax(
      parseInt(poData.fright_or_trasnportation ? poData.fright_or_trasnportation : 0) +
      (parseInt(poData.fright_or_trasnportation ? poData.fright_or_trasnportation : 0) *
        parseInt(poData.trasnportation_tax ? poData.trasnportation_tax : 0)) /
      100
    );
  }, [poData]);

  return (
    <section>
      <section className="w-full h-full">
        <div className="grid row-auto col-auto">
          <div className="text-wrap border-[1px] border-r-0 font-bold border-black border-t-0 grid grid-rows-1 grid-cols-10 align-middle">
            <div className="text-[13px] text-wrap border-r-[1px]  border-black flex items-center justify-start px-2">
              Sr. No.
            </div>
            <div className="text-[13px] text-wrap  border-r-[1px]  border-black flex items-center justify-center px-2">
              Item Code
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black flex items-center justify-center px-2">
              Item Name
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black flex items-center text-center px-2">
              Payment Term
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black flex items-center justify-center px-2">
              Inco Term
            </div>
            <div className="text-[13px] text-wrap flex justify-center items-center ">
              Delivery Date
            </div>
            <div className="text-[13px] text-wrap text-center border-r-[1px] border-l-[1px] border-black">
              Purchase Qty (PU)
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black flex items-center justify-center">
              Basic Price
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black flex items-center justify-center">
              TAX
            </div>
            <div className="text-[13px] text-wrap border-r-[1px] border-black text-end px-2 flex items-center justify-end">
              Amount
            </div>
          </div>
        </div>

        <div>

        </div>

        <div>
          {poItemData.map((item, index) => (
            <div
              key={index}
              className=" border-l-[1px] border-b-[1px] border-black grid grid-rows-1 grid-cols-10"
            >
              <div className="text-[12px] text-wrap px-2 py-1 border-r-[1px] border-black">
                {index + 1}
              </div>
              <div className="text-[12px] text-wrap text-center px-2 border-r-[1px] border-black py-1">
                {item.item_code}
              </div>
              <div className="text-[12px] text-wrap text-center px-2 border-r-[1px] border-black py-1">
                {item.item_name}
              </div>
              <div className="text-[12px] text-center text-wrap px-2 border-r-[1px] border-black py-1">
                {item.Payment_Term}
              </div>
              <div className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center py-1">
                {item.Inco_Term}
              </div>
              <div className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center py-1">
                {item.Delivery_Date}
              </div>
              <div className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center py-1">
                {item.Purchase_qty}
              </div>
              <div className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center py-1">
                {item.Basic_Price}
              </div>
              <div className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center py-1">
                {item.tax && item.tax + "%"}
              </div>
              <div className="text-[12px] text-wrap border-r-[1px] border-black text-end px-2 py-1">
                {item.amount}
              </div>
            </div>
          ))}

          <div className="border-l-[1px] border-black grid grid-rows-1 grid-cols-10">
            <div className="border-r-[1px] border-black text-[12px] row-span-5 col-span-5">
              <span className="py-1 px-2 top-0 ">{poData.term_Condition}</span>
            </div>
            <div className="border-r-[1px] border-black text-[12px] col-span-2 grid-rows-4 grid">
              <div className="border-b-[1px] border-black w-full flex justify-start py-1 text-wrap h-[28px]">
                Packing & Forwading
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-start py-1  h-[28px]">
                Freight/Transportation
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-start py-1 h-[28px]">
                Other Charges
              </div>
              <div className="w-full flex  justify-start py-1 h-[28px]">Insurance</div>
            </div>
            <div className="border-r-[1px] border-black text-[12px] ">
              <div className="border-b-[1px] border-black w-full flex justify-center py-1 h-[28px]">
                {poData.packing_Formawading ? poData.packing_Formawading : 0}
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-center h-[28px]">
                <span className="py-1">{poData.fright_or_trasnportation ? poData.fright_or_trasnportation : 0}</span>
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-center h-[28px]">
                <span className="py-1">{poData.other_charges ? poData.other_charges : 0}</span>
              </div>
              <div className="w-full flex px-2 justify-center h-[28px]">
                <span className="py-1">{poData.insurance ? poData.insurance : 0}</span>
              </div>
            </div>
            <div className="border-r-[1px] border-black text-[12px]">
              <div className="border-b-[1px] border-black w-full flex justify-center h-[28px]">
                <span className="py-1">{poData.packing_tax}%</span>
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-center h-[28px]">
                <span className="py-1">{poData.trasnportation_tax}%</span>
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-center h-[28px]">
                <span className="py-1">{poData.others_tax}%</span>
              </div>
              <div className="w-full flex px-2 justify-center h-[28px] ">
                <span className="py-1">{poData.insurance_tax}%</span>
              </div>
            </div>
            <div className="border-r-[1px] border-black text-[12px]">

              <div className="border-b-[1px] border-black w-full flex justify-end px-2 h-[28px]">
                <span className="py-1">{PackingWithTax.toFixed(2)}</span>
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-end px-2 h-[28px]">
                <span className="py-1">{TransportationWithTax.toFixed(2)}</span>
              </div>
              <div className="border-b-[1px] border-black w-full flex justify-end px-2 h-[28px]">
                <span className="py-1">{OtherWithTax.toFixed(2)}</span>
              </div>
              <div className="w-full flex px-2 justify-end h-[28px]">
                <span className="py-1">{InsuranceWithTax.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-1 grid-cols-10">
            <div className="border-r-[1px] border-t-[1px] border-l-[1px] border-black text-[12px] col-span-9">
              <div className="flex flex-col items-end">
                <span className="py-1 px-2 font-bold">Tax Total Amount :</span>
              </div>
            </div>
            <div
              colSpan={1}
              className="border-t-[1px] border-r-[1px] border-black text-[12px] text-end px-2"
            >
              <div>
                
                  {(
                    (totalTaxAmount ?? 0) +
                    (packingtax ?? 0) +
                    (Other_Charges ?? 0) +
                    (Transportation ?? 0) +
                    (Insurance ?? 0)
                  )} 
               

              </div>

            </div>
          </div>
          <div className="grid grid-rows-1 grid-cols-10">
            <div className="border-r-[1px] border-t-[1px] border-l-[1px] border-black text-[12px] col-span-9">
              <div className="flex flex-col items-end">
                <span className="py-1 px-2 font-bold">
                  Grand Total Amount :
                </span>
              </div>
            </div>
            <div
              colSpan={1}
              className="border-t-[1px] border-r-[1px] border-black text-[12px] px-2 text-end"
            >
              {(
                grandTotal +
                InsuranceWithTax +
                PackingWithTax +
                TransportationWithTax +
                OtherWithTax +
                (totalTaxAmount +
                  packingtax +
                  Other_Charges +
                  Transportation +
                  Insurance)
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="border-[1px] border-black px-5 py-2">
          <div>
            <span className="font-bold text-[12px] uppercase">Remarks:</span>
            <p className="text-[11px]">{remark}</p>
          </div>
        </div>

        <div className="flex w-full justify-center border-t-0 border-[1px] border-black border-r-[1px]">
          <div className="flex flex-col border-r-[1px] border-black px-2 items-center w-[25%] py-2">
            <span className="font-bold text-[14px]">Created Buyer</span>
            <span className="text-[10px] pt-5">{poData.createdBy}</span>
            <span className="text-[10px]">{poData.created_at}</span>
          </div>

          <div className="flex flex-col border-r-[1px] border-black px-2 items-center w-[25%] py-2">
            <span className="font-bold text-[14px] ">Checked By</span>
            <span className="text-[10px] pt-5">{poData.createdBy}</span>
            <span className="text-[10px]">{poData.created_at}</span>

          </div>

          <div className="flex flex-col border-r-[1px] border-black px-2 items-center w-[25%] py-2">
            <span className="font-bold text-[14px]">HOD MM</span>
            <span className="text-[10px] pt-5">{poData.UppdatedByHOD}</span>
            <span className="text-[10px]">{poData.HOD_status_update_at}</span>
          </div>

          <div className="flex flex-col border-r-[1px] border-black px-2 items-center w-[25%] py-2">
            <span className="font-bold text-[14px]">Final Approval</span>
            <span className="text-[10px] pt-5">{poData.UppdatedByMD}</span>
            <span className="text-[10px]">{poData.Final_Approved_at}</span>
          </div>

          <div className="flex flex-col w-[25%] items-center py-2">
            <span className="font-bold text-[14px]">current Status</span>
            <span className="text-[10px] py-2">{poData.PO_status}</span>
          </div>
        </div>
      </section>
    </section>
  );
}

export default PoViewTable;
