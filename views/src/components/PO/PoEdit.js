import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import EditPoItemTable from "./EditPoItemTable";
import moment from "moment";
import EditDoc from "./EditDoc";
import baseUrl from "../../config";

function EditPo({ onSubmit, PoId, userName }) {
  const [filesList, setFilesList] = useState(null);
  const uploadRef = useRef();
  const [poData, setPoData] = useState({
    DOC: "",
    Material_delivery_address: "",
    vender_code: "",
    vender_name: "",
    remark: "",
    insurance: "",
    insurance_tax: "",
    packing_Formawading: "",
    packing_tax: "",
    fright_or_trasnportation: "",
    trasnportation_tax: "",
    other_charges: "",
    term_condition: "",
    others_tax: ""
  });

  const [poItemData, setPoItemData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/api/Po/Po_combined`,
          { PO_ID: PoId }
        );

        setPoData(response.data.PoData);
        setPoItemData(response.data.PoItemData);
        if(response.data.files){

          response.data.files.forEach((data)=>{
            setFilesList(data.files)
          });
        }

        // Fetch vendor details based on vendor code
        const vendorResponse = await axios.get(
          `${baseUrl}/api/vender/venderData/${response.data.PoData.vender_code}`
        );
        setPoData(prevData => ({
          ...prevData,
          vender_name: vendorResponse.data.Name
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [PoId]); // Include PoId in the dependency array to refetch data when it changes



  useEffect(() => {
    let cancelRequest = false;

    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/vender/venderData/${poData.vender_code}`
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

    if (poData.vender_code.trim() !== "") {
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
  }, [poData.vender_code]);
  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setPoData({
      ...poData,
      [fieldName]: value,
    });
  };

  const currentTime = moment().format("DD-MM-YYYY HH:mm:ss");
  const updatedPoformData = {
    ...poData,
    Updated_at: currentTime,
    Updated_by: userName
  };
  
 


  const HandleClose = () => {
    onSubmit();
  };

  const handlePoItemChange = (e, fieldName, index) => {
    const { value } = e.target;
    // Create a copy of the item being modified
    const updatedItem = { ...poItemData[index] };
    // Update the specific field
    updatedItem[fieldName] = value === "" ? "" : value;
  
    // Update the 'updatedBy' and 'updatedAt' fields
    updatedItem.updatedBy = userName;
    updatedItem.updatedAt = currentTime;
  
    // Create a copy of the poItemData array and update the specific item
    const updatedData = [...poItemData];
    updatedData[index] = updatedItem;
    setPoItemData(updatedData);
  };
  



  const handlePoItemAddRow = () => {
    setPoItemData([...poItemData, {
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


  const handlePurchaseQtyChange = (index, value) => {
    const updatedPoItemData = [...poItemData];
    updatedPoItemData[index].Purchase_qty = value;
    if (value && updatedPoItemData[index].Basic_Price) {
      updatedPoItemData[index].amount = (parseFloat(value) * parseFloat(updatedPoItemData[index].Basic_Price)).toFixed(2);
    } else {
      updatedPoItemData[index].amount = updatedPoItemData[index].Basic_Price;
    }
    setPoItemData(updatedPoItemData);
  };
  

  const handleBasicPriceChange = (index, value) => {
    const updatedPoItemData = [...poItemData];
    updatedPoItemData[index].Basic_Price = value;
    if (value && updatedPoItemData[index].Purchase_qty) {
      updatedPoItemData[index].amount = (parseFloat(value) * parseFloat(updatedPoItemData[index].Purchase_qty)).toFixed(2);
    } else {
      updatedPoItemData[index].amount = value;
    }
    setPoItemData(updatedPoItemData);
  };
  

  const handlePoItemDeleteRow = (index) => {
    const updatedData = [...poItemData];
    updatedData.splice(index, 1);
    setPoItemData(updatedData);
  };

  //PoFiles


  const handleFileUploads = () => {
    uploadRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return; // No files selected, do nothing
    }
  
    // Convert FileList to an array of objects with filename and file object
    
    const newFiles = Array.from(selectedFiles).map((file) => ({
      filename: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileObject: file,
    }));
    
  
    // Update filesList state with the new files
    setFilesList((prevFiles) => (prevFiles ? [...prevFiles, ...newFiles] : newFiles));
  };
  
  const handleFilesDelete = (index) => {
    // Remove the file from the filesList state array
    setFilesList((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };
  
  const handleUpdatePo = async () => {
    try {
      const formData = new FormData();
  
      // Append PO data
      formData.append("poData", JSON.stringify(updatedPoformData));
  
      // Append PO items data
      formData.append("itemData", JSON.stringify(poItemData));
  
      console.log(poItemData)
      console.log(updatedPoformData)
      // Append files
      if (filesList) {
        filesList.forEach((file) => {
          // Check if it's a new file or an existing file (already uploaded)
          if (file.fileObject instanceof File) {
            // New file, append it
            formData.append("file", file.fileObject);
          } else {
            // Existing file, append its filename
            formData.append("existingFiles", file.fileObject);
          }
        });
      }
  
      // Append deleted file indexes
      // const deletedFileIndexes = filesList.filter(file => file.markedForDeletion).map((file, index) => index.toString());
      // formData.append("deletedFileIndexes", JSON.stringify(deletedFileIndexes));
  
      const response = await axios.put(
        `http://localhost:8000/api/Po/updateAll/${PoId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data);
      alert("Data updated successfully");
      onSubmit();
    } catch (error) {
      alert("Error updating Data");
    }
  };
  
  
  
  
  return (
    <section className="w-100 bg-white h-full h-min-screen py-5">
      <div className=" py-3 flex w-full px-2">
        <div className="w-[80%] flex justify-center">
          <h1 className="text-md tracking-wider font-bold pb-[0px] ">
            Edit Manual Purchase Orders
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
      <form className="px-2">
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
                className="input w-[293px]"
                onChange={(e) => handleChange(e, "DOC")}
                value={poData.DOC}
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
                className="input w-[500px]"
                placeholder="Material Delivery Address"
                type="text"
                value={poData.Material_delivery_address}
                onChange={(e) => handleChange(e, "Material_delivery_address")}
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
                type="text"
                placeholder="Vender Code"
                className="input w-[210px]"
                value={poData.vender_code}
                onChange={(e) => handleChange(e, "vender_code")}
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
                className="input "
                placeholder="Vender Name"
                type="text"
                value={poData.vender_name}
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
                type="text"
                placeholder="Enter Remarks"
                value={poData.remark}
                className="input w-[600px]"
                onChange={(e) => handleChange(e, "remark")}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Insurance
                </label>
                <input
                  placeholder="Insurance"
                  className="input w-[200px]"
                  type="text"
                  value={poData.insurance}
                  onChange={(e) => handleChange(e, "insurance")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>

                <select className="input w-[210px]" value={poData.insurance_tax} onChange={(e) => handleChange(e, "insurance_tax")}>
                  <option value="" disabled hidden >
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
                  Packing & Forwading
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Packing & Forwading"
                  value={poData.packing_Formawading}
                  onChange={(e) => handleChange(e, "packing_Formawading")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">  
                  Tax
                </label>

                <select
                  className="input w-[210px]"
                  value={poData.packing_tax} onChange={(e) => handleChange(e, "packing_tax")}
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
                  value={poData.fright_or_trasnportation}
                  onChange={(e) => handleChange(e, "fright_or_trasnportation")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>

                <select value={poData.trasnportation_tax} onChange={(e) => handleChange(e, "trasnportation_tax")}
                  className="input w-[210px]"
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
                  value={poData.other_charges}
                  onChange={(e) => handleChange(e, "other_charges")}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>

                <select
                  className="input w-[210px]" value={poData.others_tax} onChange={(e) => handleChange(e, "others_tax")}
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
            <div className="px-2 pt-3 w-full">
              <label className="text-[12px]">Terms And Conditions</label>
              <textarea
                name=""

                placeholder="Terms and Conditions"
                className=" w-full px-5 py-3 border-[1px] border-black rounded-md min-h-20"
                value={poData.term_condition}
                onChange={(e) => handleChange(e, "term_condition")}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Po_table */}
        <section className="w-full px-2 py-5">
          <div>
            <EditPoItemTable PoId={PoId} userName={userName} poItemData={poItemData} handlePoItemAddRow={handlePoItemAddRow} handlePoItemChange={handlePoItemChange} handlePoItemDeleteRow={handlePoItemDeleteRow} handlePurchaseQtyChange={handlePurchaseQtyChange} handleBasicPriceChange={handleBasicPriceChange} />
          </div>

          {/* File inputs */}
          <section className="w-full">
            <EditDoc POId={PoId} filesLists={filesList} uploadRef={uploadRef} handleDelete={handleFilesDelete} handleFileChange={handleFileChange} handleFileUploads={handleFileUploads} />
          </section>
        </section>

        <div className="pt-4 pl-[10px]">
          <button onClick={() => handleUpdatePo(PoId)}
            type="button"
            className="w-[120px] h-[40px] bg-gray-500 text-white text-[15px] rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPo;
