import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function EditPoItemTable({ poItemData,  handlePoItemChange, handlePoItemDeleteRow,handlePoItemAddRow, handleBasicPriceChange,handlePurchaseQtyChange }) {



  return (
    <section className="w-full">
      <table className="w-full px-2 border-none">
        <thead>
          <tr>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Sr. No.</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Item Code</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Item Name</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Purchase Qty (PU)</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Payment Term</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Inco Term</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Basic Price</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Tax</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Amount</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-r-[1px] border-white text-wrap">Delivery Date</th>
            <th className="text-[12px] font-bold px-2 py-1 uppercase bg-[#b0b7dc] border-b-[1px] border-white text-wrap">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 py-2">
          {poItemData.map((item, index) => (
            <tr key={index}>
              <td className="text-center p-1 border-none h-[40px]">{index + 1}</td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.item_code}
                  onChange={(e) => handlePoItemChange(e, "item_code", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.item_name}
                  onChange={(e) => handlePoItemChange(e, "item_name", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Purchase_qty}
                  onChange={(e) => handlePurchaseQtyChange(index, e.target.value)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Payment_Term}
                  onChange={(e) => handlePoItemChange(e, "Payment_Term", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Inco_Term}
                  onChange={(e) => handlePoItemChange(e, "Inco_Term", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Basic_Price}
                  onChange={(e) => handleBasicPriceChange(index, e.target.value)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <select
                  className="input"
                  value={item.tax}
                  onChange={(e) => handlePoItemChange(e, "tax", index)}
                >
                  <option value="" disabled selected hidden>
                    select Tax
                  </option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.amount}
                
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none text-[10px]"
                  type="date"
                  value={item.Delivery_Date}
                  onChange={(e) => handlePoItemChange(e, "Delivery_Date", index)}
                />
              </td>
              <td className="flex justify-end items-center px-2 border-none py-2">
                {poItemData.length > 1 && (
                  <button
                    onClick={() => handlePoItemDeleteRow(index)} type="button"
                    className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px]"
                  >
                    <FaTrash />
                  </button>
                )}
                <button type="button"
                  onClick={handlePoItemAddRow}
                  className="ml-1 px-2 text-white bg-green-600 text-[12px] h-[25px]"
                >
                  <FaPlus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </section>
  );
}

export default EditPoItemTable;
