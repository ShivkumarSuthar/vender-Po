import axios from "axios";
import React, { useEffect, useState } from "react";

function PoViewTable({ POId, vender_id, remark, poData, userData, poItemData }) {
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
    setGrandTotal(totalAmount + totalTax);

  }, [poItemData]);

  useEffect(() => {
    if (poData) {
      setPackingTax((poData.packing_Formawading * poData.packing_tax) / 100);
      seTransportation(
        (poData.fright_or_trasnportation * poData.trasnportation_tax) / 100
      );
      setOther_Charge((poData.other_charges * poData.others_tax) / 100);
      setInsurance((poData.insurance * poData.insurance_tax) / 100);
    }
    setPackingWithTax(
      parseInt(poData.packing_Formawading) +
      (parseInt(poData.packing_Formawading) * parseInt(poData.packing_tax)) /
      100
    );

    setOtherWithTax(
      parseInt(poData.other_charges) +
      (parseInt(poData.other_charges) * parseInt(poData.others_tax)) / 100
    );

    setInsuranceWithTax(
      parseInt(poData.insurance) +
      (parseInt(poData.insurance) * parseInt(poData.insurance_tax)) / 100
    );
    setTransportationWithTax(
      parseInt(poData.fright_or_trasnportation) +
      (parseInt(poData.fright_or_trasnportation) *
        parseInt(poData.trasnportation_tax)) /
      100
    );
  }, [poData]);

  return (
    <section>
      <table className="w-full h-full">
        <thead>
          <tr className="text-wrap border-[1px] border-black border-t-0">
            <th className="text-[13px] text-wrap border-r-[1px] border-black py-2">
              Sr. No.
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              Item Code
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              Item Name
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              Payment Term
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              Inco Term
            </th>
            <th className="text-[13px] text-wrap ">Delivery Date</th>
            <th className="text-[13px] text-wrap border-r-[1px] border-l-[1px] border-black">
              Purchase Qty (PU)
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              Basic Price
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black">
              TAX
            </th>
            <th className="text-[13px] text-wrap border-r-[1px] border-black text-end px-2">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {poItemData.map((item, index) => (
            <tr
              key={index}
              className="border-r-[1px] border-l-[1px] border-b-[1px] border-black"
            >
              <td className="text-[12px] text-wrap px-2 py-1 border-r-[1px] border-black">
                {index + 1}
              </td>
              <td className="text-[12px] text-wrap text-center px-2 border-r-[1px] border-black">
                {item.item_code}
              </td>
              <td className="text-[12px] text-wrap text-center px-2 border-r-[1px] border-black">
                {item.item_name}
              </td>
              <td className="text-[12px] text-center text-wrap px-2 border-r-[1px] border-black">
                {item.Payment_Term}
              </td>
              <td className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center">
                {item.Inco_Term}
              </td>
              <td className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center">
                {item.Delivery_Date}
              </td>
              <td className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center">
                {item.Purchase_qty}
              </td>
              <td className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center">
                {item.Basic_Price}
              </td>
              <td className="text-[12px] text-wrap px-2 border-r-[1px] border-black text-center">
                {item.tax}%
              </td>
              <td className="text-[12px] text-wrap border-r-[1px] border-black text-end px-2">
                {item.amount}
              </td>
            </tr>
          ))}

          <tr className="border-l-[1px] border-black">
            <td
              colSpan={5}
              className="border-r-[1px] border-black text-[12px] "
            >
              <span className="py-1 px-2 top-0 ">Adjust values</span>
            </td>
            <td colSpan={2} className="border-r-[1px] border-black text-[12px]">
              <tr className="border-b-[1px] border-black w-full flex justify-start px-5">
                <span className="py-1">Adjust Value</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-start px-5">
                <span className="py-1">Packing & Forwading</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-start px-5">
                <span className="py-1">Freight/Transportation</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-start px-5">
                <span className="py-1">Other Charges</span>
              </tr>
              <tr className="w-full flex  justify-start px-5 ">
                <span className="py-1">Insurance</span>
              </tr>
            </td>
            <td className="border-r-[1px] border-black text-[12px]">
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">-</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.packing_Formawading}</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.fright_or_trasnportation}</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.other_charges}</span>
              </tr>
              <tr className="w-full flex px-2 justify-center ">
                <span className="py-1">{poData.insurance}</span>
              </tr>
            </td>
            <td className="border-r-[1px] border-black text-[12px]">
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">-</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.packing_tax}%</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.trasnportation_tax}%</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-center">
                <span className="py-1">{poData.others_tax}%</span>
              </tr>
              <tr className="w-full flex px-2 justify-center ">
                <span className="py-1">{poData.insurance_tax}%</span>
              </tr>
            </td>
            <td className="border-r-[1px] border-black text-[12px]">
              <tr className="border-b-[1px] border-black w-full flex justify-end px-2">
                <span className="py-1">-</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-end px-2">
                <span className="py-1">{PackingWithTax.toFixed(2)}</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-end px-2">
                <span className="py-1">{TransportationWithTax.toFixed(2)}</span>
              </tr>
              <tr className="border-b-[1px] border-black w-full flex justify-end px-2">
                <span className="py-1">{OtherWithTax.toFixed(2)}</span>
              </tr>
              <tr className="w-full flex px-2 justify-end">
                <span className="py-1">{InsuranceWithTax.toFixed(2)}</span>
              </tr>
            </td>
          </tr>
          <tr>
            <td
              colSpan={9}
              className="border-r-[1px] border-t-[1px] border-l-[1px] border-black text-[12px]"
            >
              <div className="flex flex-col items-end">
                <span className="py-1 px-2 font-bold">Tax Total Amount :</span>
              </div>
            </td>
            <td
              colSpan={1}
              className="border-t-[1px] border-r-[1px] border-black text-[12px] text-end px-2"
            >
              {(
                totalTaxAmount +
                packingtax +
                Other_Charges +
                Transportation +
                Insurance
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td
              colSpan={9}
              className="border-r-[1px] border-t-[1px] border-l-[1px] border-black text-[12px]"
            >
              <div className="flex flex-col items-end">
                <span className="py-1 px-2 font-bold">Grand Total Amount :</span>
              </div>
            </td>
            <td
              colSpan={1}
              className="border-t-[1px] border-r-[1px] border-black text-[12px] px-2 text-end"
            >
              {((grandTotal +
                InsuranceWithTax +
                PackingWithTax +
                TransportationWithTax +
                OtherWithTax) +
                (
                  totalTaxAmount +
                  packingtax +
                  Other_Charges +
                  Transportation +
                  Insurance
                )).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <section>
        <div className="border-[1px] border-black px-5 py-2">
          <div>
            <span className="font-bold text-[12px] uppercase">Remarks:</span>
            <p className="text-[11px]">{remark}</p>
          </div>
        </div>

        <div className="flex w-full justify-center border-t-0 border-[1px] border-black border-r-[1px]">
          <div className="flex flex-col border-r-[1px] border-black px-10 items-center w-[25%] py-3">
            <span className="font-bold text-[14px]">Created Buyer</span>
            <span className="text-[12px] pt-5">{poData.createdBy}</span>
            <span className="text-[12px]">
              {poData.created_at}
            </span>
          </div>

          <div className="flex flex-col border-r-[1px] border-black px-10 items-center w-[25%] py-2">
            <span className="font-bold text-[14px] ">Checked By</span>
            <span className="text-[12px] pt-5">{poData.UppdatedBybuyer}</span>
            <span className="text-[12px]">
              {poData.buyyer_status_update_at}
            </span>
          </div>

          <div className="flex flex-col border-r-[1px] border-black px-10 items-center w-[25%] py-2">
            <span className="font-bold text-[14px]">HOD MM</span>
            <span className="text-[12px] pt-5">{poData.UppdatedByHOD}</span>
            <span className="text-[12px]">{poData.HOD_status_update_at}</span>
          </div>

          <div className="flex flex-col border-r-[1px] border-black px-10 items-center w-[25%] py-2">
            <span className="font-bold text-[14px]">Final Approval</span>
            <span className="text-[12px] pt-5">{poData.UppdatedByMD}</span>
            <span className="text-[12px]">{poData.Final_Approved_at}</span>
          </div>

          <div className="flex flex-col w-[25%] items-center py-2">
            <span className="font-bold text-[14px]">current Status</span>
            <span className="text-[12px] py-2">{poData.PO_status}</span>
          </div>
        </div>
      </section>
    </section >
  );
}

export default PoViewTable;
