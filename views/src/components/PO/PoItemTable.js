import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";

function PoItemTable({ isSubmit, PoId, userName }) {
  const [poItemData, setPoItemData] = useState([
    {
      itemCode: "",
      itemName: "",
      purchaseQty: "",
      paymentTerm: "",
      incoTerm: "",
      basicPrice: "",
      tax: "",
      amount: "", 
      deliveryDate: "12-1-15",
      PO_id: PoId,
      createdBy: userName
    },
  ]);

  const handlePurchaseQtyChange = (index, value) => {
    const updatedPoItemData = [...poItemData];
    updatedPoItemData[index].purchaseQty = value;
    if (value && updatedPoItemData[index].basicPrice) {
      updatedPoItemData[index].amount = (parseFloat(value) * parseFloat(updatedPoItemData[index].basicPrice)).toFixed(2);
    } else {
      updatedPoItemData[index].amount = updatedPoItemData[index].basicPrice;
    }
    setPoItemData(updatedPoItemData);
  };
  
  const handleBasicPriceChange = (index, value) => {
    const updatedPoItemData = [...poItemData];
    updatedPoItemData[index].basicPrice = value;
    if (value && updatedPoItemData[index].purchaseQty) {
      updatedPoItemData[index].amount = (parseFloat(value) * parseFloat(updatedPoItemData[index].purchaseQty)).toFixed(2);
    } else {
      updatedPoItemData[index].amount = value;
    }
    setPoItemData(updatedPoItemData);
  };
  

  const [newOrder, setNewOrder] = useState({
    itemCode: "",
    itemName: "",
    purchaseQty: "",
    paymentTerm: "",
    incoTerm: "",
    basicPrice: "",
    tax: "",
    amount: "",
    deliveryDate: "",
    PO_id: PoId,
    createdBy: userName
  });

  useEffect(() => {
    if (isSubmit) {
      const handleSubmit = async () => {
        try {
          for (let i = 0; i < poItemData.length; i++) {
            const itemData = {
              ...poItemData[i],
              PO_id: PoId,
              createdBy: userName
            };

            const response = await axios.post(
              "http://localhost:8000/api/poItems/add",
              itemData
            );
            console.log("Response:", response.data);
          }
        } catch (error) {
          console.error("Error occurred while submitting data:", error);
        }
      };
      handleSubmit();
    }
  }, [isSubmit]);

  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedData = [...poItemData];
    updatedData[index] = { ...updatedData[index], [fieldName]: value };
    setPoItemData(updatedData);
  };

  const handleAddRow = () => {
    setPoItemData([...poItemData, newOrder]);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...poItemData];
    updatedData.splice(index, 1);
    setPoItemData(updatedData);
  };

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
                  onChange={(e) => handleChange(e, "itemCode", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px] text-wrap">
                <input
                  className="w-full h-full text-wrap"
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleChange(e, "itemName", index)}
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
                  onChange={(e) => handleChange(e, "paymentTerm", index)}
                />
              </td>
              <td className="text-center p-1 border-none h-[40px]">
                <input
                  className="w-full h-full"
                  type="text"
                  value={item.incoTerm}
                  onChange={(e) => handleChange(e, "incoTerm", index)}
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
                  onChange={(e) => handleChange(e, "tax", index)}
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
                  onChange={(e) => handleChange(e, "deliveryDate", index)}
                />
              </td>
              <td className="flex justify-end items-center px-2 border-none py-2">
                {poItemData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px] "
                  >
                    <FaTrash />
                  </button>
                )}

                <button
                  type="button"
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
    </section>
  );
}

export default PoItemTable;
