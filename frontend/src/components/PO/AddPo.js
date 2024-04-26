import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import PoItemTable from "./PoItemTable";
import AddDoc from "./AddDoc";
import baseUrl from "../../config";
function AddPo({ onSubmit, addClose, userName }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [PoData, setPoData] = useState({
    DOC: "",
    Material_delivery_address: "",
    remark: "",
    insurance: "",
    insurance_tax: 0,
    packing_Formawading: "",
    packing_tax: 0,
    trasnportation: "",
    trasnportation_tax: 0,
    other_charges: "",
    others_tax: 0,
    term_condition: "",
    vender_name: "",
    vender_code: "",
    createdBy: userName,
  });

  useEffect(() => {
    let cancelRequest = false;

    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/vender/venderData/${PoData.vender_code}`
        );
        if (!cancelRequest) {
          setPoData((prevData) => ({
            ...prevData,
            vender_name: response.data.Name,
          }));
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    if (PoData.vender_code.trim() !== "") {
      const timeoutId = setTimeout(fetchVendorData, 500);
      return () => {
        clearTimeout(timeoutId);
        cancelRequest = true;
      };
    } else {
      setPoData((prevData) => ({
        ...prevData,
        vender_name: "",
      }));
    }
  }, [PoData.vender_code]);


  const handlePoDataChange = (e, fieldName) => {
    const { value } = e.target;
    setPoData({
      ...PoData,
      [fieldName]: value,
    });
  };



  const HandleClose = () => {
    addClose();
  };







  //poitems functions
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
      createdBy: userName
    },
  ]);

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
    createdBy: userName
  });

  // setNewOrder([...newOrder]) //unwanted changes in newOrder
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
  const handlePoItemChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedData = [...poItemData];
    updatedData[index] = { ...updatedData[index], [fieldName]: value };
    setPoItemData(updatedData);
  };

  const handlePoItemAddRow = () => {
    setPoItemData([...poItemData, newOrder]);
  };

  const handlePoItemDeleteRow = (index) => {
    const updatedData = [...poItemData];
    updatedData.splice(index, 1);
    setPoItemData(updatedData);
  };

  //PoFIles
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const uploadRef = useRef();

  const handleFileUploads = () => {
    uploadRef.current.click();
  };


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    const names = selectedFiles.map((file) => file.name);
    setFileNames((prevNames) => [...prevNames, ...names]);
  };


  const handleFilesDelete = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setFileNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };
  useEffect(() => {
   console.log(files)
  }, [files])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append PO data
    formData.append('poDataObject', JSON.stringify(PoData));

    // Append PO items data
    formData.append('poItems', JSON.stringify(poItemData));

    // Append files
    files.forEach((file) => {
        formData.append("POFiles", file);
    });

    try {
        const poResponse = await axios.post(
            `${baseUrl}/api/Po/AddPo`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(poResponse.data);
        setIsSubmit(true);
        alert("Added successfully!");
        onSubmit();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding data.");
    }
};




  return (
    <section className="w-100 bg-white min-h-[100svh]">
      <div className=" py-3 flex w-full px-2">
        <div className="w-[80%] flex justify-center">
          <h1 className="text-md tracking-wider font-bold pb-[0px] ">
            Add Manual Purchase Orders
          </h1>
        </div>
        <div className="w-[20%] flex justify-end">
          <button
            className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center"
            onClick={HandleClose}
          >
            <span className="  text-white  text-2xl text-center ">
              <IoMdClose />
            </span>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="px-2 text-[15px]">
        <div className="w-100">
          <div className="w-100 flex ">
            <div className="flex flex-col p-2">
              <label htmlFor="Doc" className="text-[12px]">
                DOC Date
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input
                type="date"
                value={PoData.DOC}
                required
                className="input w-[293px]"
                onChange={(e) => handlePoDataChange(e, "DOC")}
              />
            </div>

            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Material Delivery Address
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input
                required
                className="input w-[500px]"
                placeholder="Material Delivery Address"
                type="text"
                value={PoData.Material_delivery_address}
                onChange={(e) => handlePoDataChange(e, "Material_delivery_address")}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Vender Code
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input
                required
                type="text"
                placeholder="Vender Code"
                className="input w-[210px]"
                value={PoData.vender_code}
                onChange={(e) => handlePoDataChange(e, "vender_code")}
              />
            </div>
            <div className="flex  flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Vender Name
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input
                required
                className="input "
                placeholder="Vender Name"
                type="text"
                value={PoData.vender_name}

              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Remarks
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter Remarks"
                className="   input w-[600px]"
                value={PoData.remark}
                onChange={(e) => handlePoDataChange(e, "remark")}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Insurance
                </label>
                <input
                  required
                  placeholder="Insurance"
                  className="input w-[200px]"
                  type="text"
                  value={PoData.insurance}
                  onChange={(e) => handlePoDataChange(e, "insurance")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showInsuranceTax ? ( */}
                <select
                  className="input w-[210px]"
                  onChange={(e) => handlePoDataChange(e, "insurance_tax")}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Tax below
                  </option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Packing & Forwading
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Packing & Forwading"
                  value={PoData.packing_Formawading}
                  onChange={(e) => handlePoDataChange(e, "packing_Formawading")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showPackingTax ? ( */}
                <select
                  className="input w-[210px]"
                  onChange={(e) => handlePoDataChange(e, "setpacking_tax")}
                >
                  <option value="" disabled selected hidden>
                    Select Tax
                  </option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Freight or Transportation
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Freight or Transportation"
                  value={PoData.trasnportation}
                  onChange={(e) => handlePoDataChange(e, "trasnportation")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showTransportationTax ? ( */}
                <select
                  className="input w-[210px]"

                  onChange={(e) => handlePoDataChange(e, "trasnportation_tax")}
                >
                  <option value="" disabled selected hidden>
                    Select Tax
                  </option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Other Charges
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Enter Other Charges"
                  value={PoData.other_charges}
                  onChange={(e) => handlePoDataChange(e, "other_charges")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showOtherTax ? ( */}
                <select
                  className="input w-[210px]"

                  onChange={(e) => handlePoDataChange(e, "setothers_tax")}
                >
                  <option value="" disabled selected hidden>
                    select Tax
                  </option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-2 pt-3">
            <textarea
              name=""

              placeholder="Terms and Conditions"
              className=" w-full px-5 py-3 border-[1px] border-black rounded-md min-h-20"
              value={PoData.term_condition}
              onChange={(e) => handlePoDataChange(e, "term_condition")}
            ></textarea>
          </div>
        </div>

        {/* Po_table */}
        <section className="w-full px-2 py-5">
          <div>
            <PoItemTable isSubmit={isSubmit} poItemData={poItemData} userName={userName} handlePoItemDeleteRow={handlePoItemDeleteRow} handlePoItemAddRow={handlePoItemAddRow} handlePoItemChange={handlePoItemChange} handlePurchaseQtyChange={handlePurchaseQtyChange} handleBasicPriceChange={handleBasicPriceChange} />
          </div>

          {/* File inputs */}
          <section className="w-full">
            <AddDoc uploadRef={uploadRef} handleFileChange={handleFileChange} handleFileUploads={handleFileUploads} handleFilesDelete={handleFilesDelete} fileNames={fileNames} files={files} />
          </section>
        </section>

        <div className="pt-4 pl-[10px]">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[120px] h-[40px] bg-gray-500 text-white text-[15px] rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddPo;
