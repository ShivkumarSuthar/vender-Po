import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

function EditPoItemTable({ poItemData, userName,PoId }) {
  const [poItemDatas, setPoItemDatas] = useState(poItemData);

  const currentTime = moment().format('DD-MM-YYYY HH:mm:ss');

  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;
    // Create a copy of the item being modified
    const updatedItem = { ...poItemDatas[index] };
    // Update the specific field
    updatedItem[fieldName] = value === "" ? "" : value;


    // Update the 'updatedBy' and 'updatedAt' fields
    updatedItem.updatedBy = userName;
    updatedItem.updatedAt = currentTime;

    // Create a copy of the poItemData array and update the specific item
    const updatedData = [...poItemDatas];
    updatedData[index] = updatedItem;
    setPoItemDatas(updatedData);
    console.log(updatedData)
  };



  const handleAddRow = () => {
    setPoItemDatas([...poItemData, {
      item_code: "",
      item_name: "",
      Purchase_qty: "",
      Payment_Term: "",
      Inco_Term: "",
      Basic_Price: "",
      tax: "",
      amount: "",
      Delivery_Date: "",
      PO_id: "",
    }]);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...poItemData];
    updatedData.splice(index, 1);
    setPoItemDatas(updatedData);
  };


  const handleupdate = async (e) => {
    console.log(poItemData)
    try {
      const responses = await Promise.all(
        poItemData.map(item =>
          axios.put(`http://localhost:8000/api/poItems/edit/${PoId}/${item._id}`, item)
        )
      );
   
      responses.forEach(response => {
        console.log("Updated PO items:", response.data);
      });

      console.log("All PO items updated successfully");
    } catch (error) {
      console.error("Error updating PO items:", error);
      // Handle error, show error message, etc.
    }
  };


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
                  onChange={(e) => handleChange(e, "item_code", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.item_name}
                  onChange={(e) => handleChange(e, "item_name", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Purchase_qty}
                  onChange={(e) => handleChange(e, "Purchase_qty", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Payment_Term}
                  onChange={(e) => handleChange(e, "Payment_Term", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Inco_Term}
                  onChange={(e) => handleChange(e, "Inco_Term", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.Basic_Price}
                  onChange={(e) => handleChange(e, "Basic_Price", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.tax}
                  onChange={(e) => handleChange(e, "tax", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none"
                  type="text"
                  value={item.amount}
                  onChange={(e) => handleChange(e, "amount", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full border-none text-[10px]"
                  type="date"
                  value={item.Delivery_Date}
                  onChange={(e) => handleChange(e, "Delivery_Date", index)}
                />
              </td>
              <td className="flex justify-end items-center px-2 border-none py-2">
                {poItemData.length > 1 && (
                  <button
                    onClick={() => handleDeleteRow(index)} type="button"
                    className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px]"
                  >
                    <FaTrash />
                  </button>
                )}
                <button type="button"
                  onClick={handleAddRow}
                  className="ml-1 px-2 text-white bg-green-600 text-[12px] h-[25px]"
                >
                  <FaPlus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleupdate}>submit</button>
    </section>
  );
}

export default EditPoItemTable;
