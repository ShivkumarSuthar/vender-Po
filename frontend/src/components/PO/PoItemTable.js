import React  from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function PoItemTable({ isSubmit, PoId, userName,poItemData, handlePoItemDeleteRow, handlePoItemAddRow, handlePoItemChange,handleBasicPriceChange,handlePurchaseQtyChange }) {

  return (
    <section className="w-full">
      <table className="w-full px-2 border-none ">
      <thead>
          <tr>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Sr. No.
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Item <br />Code
            </th>
            <th className="text-[12px] w-[200px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Item <br /> Name
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Purchase <br />Qty (PU)
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Payment <br /> Term
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Inco <br />Term
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Basic <br />Price
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              TAX
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Amount
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
              Delivery Date
            </th>
            <th className="text-[12px] font-bold  px-2 py-1 uppercase  bg-[#b0b7dc] border-b-[1px] border-white text-wrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 py-1 text-[12px]">
          {poItemData.map((item, index) => (
            <tr className="h-[40px]" key={index}>
              {/* Table rows */}
              <td className="text-center px-1 border-none h-[40px]">
                {index + 1}
              </td>
              <td className="text-center p-1 border-none h-[40px] ">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.itemCode}
                  onChange={(e) => handlePoItemChange(e, "itemCode", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px] text-wrap">
                <input
                  className="w-full h-full text-wrap"
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handlePoItemChange(e, "itemName", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full"
                  type="text"
                  value={item.purchaseQty}
                  onChange={(e) => handlePurchaseQtyChange(index, e.target.value)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full"
                  type="text"
                  value={item.paymentTerm}
                  onChange={(e) => handlePoItemChange(e, "paymentTerm", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full"
                  type="text"
                  value={item.incoTerm}
                  onChange={(e) => handlePoItemChange(e, "incoTerm", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full"
                  type="text"
                  value={item.basicPrice}
                  onChange={(e) => handleBasicPriceChange(index, e.target.value)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <select
                  className="input"
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
                  disabled={true}
                  className="w-full h-full rounded-md bg-white px-2 py-1"
                  value={item.amount}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full text-[10px]"
                  type="date"
                  value={item.deliveryDate}
                  onChange={(e) => handlePoItemChange(e, "deliveryDate", index)}
                />
              </td>
              <td className="flex justify-end items-center px-2 border-none py-2 h-full">
                {poItemData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handlePoItemDeleteRow(index)}
                    className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px] "
                  >
                    <FaTrash />
                  </button>
                )}

                <button
                  type="button"
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

export default PoItemTable;
