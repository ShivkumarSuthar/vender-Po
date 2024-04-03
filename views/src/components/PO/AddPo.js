import React, { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import PoItemTable from "./PoItemTable";
import AddDoc from "./AddDoc";

function AddPo({ onSubmit, addClose, userName }) {
  const [DOC, setDOC] = useState("");
  const [Material_delivery_address, setMaterial_delivery_address] =
    useState("");
  const [vender_code, setvender_code] = useState("");
  const [vender_name, setvender_name] = useState("");
  const [remark, setremark] = useState("");
  const [insurance, setinsurance] = useState("");
  const [insurance_tax, setinsurance_tax] = useState("");
  const [packing_Formawading, setpacking_Formawading] = useState("");
  const [packing_tax, setpacking_tax] = useState("");
  const [trasnportation, settrasnportation] = useState("");
  const [trasnportation_tax, settrasnportation_tax] = useState("");
  const [other_charges, setother_charges] = useState("");
  const [others_tax, setothers_tax] = useState("");
  const [showInsuranceTax, setshowInsuranceTax] = useState(false);
  const [showPackingTax, setshowPackingTax] = useState(false);
  const [showTransportationTax, setshowTransportationTax] = useState(false);
  const [showOtherTax, setshowOtherTax] = useState(false);
  const [venderData, setVenderData] = useState([]);
  const [venderId, setVenderId] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [poId, setPoId] = useState("")
  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

  useEffect(() => {
    // Effect to calculate insurance tax when insurance value changes
    if (insurance !== "") {
      const tax = calculateTax(insurance, insurance_tax);
      setinsurance_tax(tax);
    }
  }, [insurance]);

  useEffect(() => {
    // Fetch vendor data based on vendor code
    const getService = async (vender_code) => {
      if (vender_code) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/vender/venderData/${vender_code}`
          );
          setVenderData(response.data);
          setvender_name(response.data.Name);
          setVenderId(response.data._id);
        } catch (error) {
          alert("Something went wrong", error);
        }
      }
    };
    getService(vender_code);

    console.log("addPO" + isSubmit)
    //POItems
  }, [vender_code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare purchase order data
      const poFormData = {
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
        vender_name: vender_name,
        vender_code: vender_code,
        createdBy: userName
      };
      // Send purchase order data to the server
      const poResponse = await axios.post("http://localhost:8000/api/Po/add", poFormData);

      // Update the state with the received ID
      setPoId(poResponse.data._id);

      setisSubmit(true)
      // Alert and other actions as needed
      alert("Added successfully!");

      // onSubmit();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding data.");
    }
    console.log(poId)
  };

  const calculateTax = (amount, taxRate) => {
    const tax = parseFloat(amount) * (parseFloat(taxRate) / 100);
    return tax;
  };

  const handleNumericInputChange = (setValue, value) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value) || value === "") {
      setValue(value);
    }
  };

 

  const HandleClose = () => {
    addClose();
  };

  const handleFileInputChange = (e, orderIndex) => {
    const file = e.target.files[0];
    const updatedFileInputs = [...fileInputs];
    updatedFileInputs[orderIndex] = { ...updatedFileInputs[orderIndex], file };
    setFileInputs(updatedFileInputs);
  };

  const addFileInput = () => {
    const newInput = { id: fileInputs.length + 1 };
    setFileInputs([...fileInputs, newInput]);
  };

  const removeFileInput = (id) => {
    const updatedInputs = fileInputs.filter((input) => input.id !== id);
    setFileInputs(updatedInputs);
  };

  const handleDelete = (id) => {
    removeFileInput(id);
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
      <form onSubmit={handleSubmit} className="px-2">
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
                value={DOC} required
                className="input w-[293px]"
                onChange={(e) => setDOC(e.target.value)}
              />
            </div>

            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Material Delivery Address
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input required
                className="input w-[500px]"
                placeholder="Material Delivery Address"
                type="text"
                value={Material_delivery_address}
                onChange={(e) => setMaterial_delivery_address(e.target.value)}
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
              <input required
                type="text"
                placeholder="Vender Code"
                className="input w-[210px]"
                value={vender_code}
                onChange={(e) => setvender_code(e.target.value)}
              />
            </div>
            <div className="flex  flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Vender Name
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input required
                className="input "
                placeholder="Vender Name"
                type="text"
                value={vender_name}
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-[12px]">
                Remarks
                <span>
                  <sup className="text-red-800">*</sup>
                </span>
              </label>
              <input required
                type="text"
                placeholder="Enter Remarks"
                value={remark}
                className="   input w-[600px]"
                onChange={(e) => setremark(e.target.value)}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Insurance
                </label>
                <input required
                  placeholder="Insurance"
                  className="input w-[200px]"
                  type="text"
                  value={insurance}
                  onChange={(e)=>setinsurance(e.target.value)}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showInsuranceTax ? ( */}
                  <select className="input w-[210px]" onChange={(e)=>setinsurance_tax(e.target.value)} required>
                    <option value="" disabled selected hidden>
                      Select Tax
                    </option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                {/* ) : (
                  <input
                    type="text" required
                    value={insurance_tax} className="input"
                    onChange={() => setshowInsuranceTax(!showInsuranceTax)}
                  />
                )} */}
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Packing & Forwading
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Packing & Forwading"
                  value={packing_Formawading}
                  onChange={(e)=>setpacking_Formawading(e.target.value)}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showPackingTax ? ( */}
                  <select
                    className="input w-[210px]"
                    onChange={(e)=>setpacking_tax(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Select Tax
                    </option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                {/* ) : (
                  <input
                    type="text"
                    value={packing_tax}
                    onChange={() => setshowPackingTax(!showPackingTax)} className="input"
                  />
                )} */}
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
                  value={trasnportation}
                  onChange={(e)=>settrasnportation(e.target.value)}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showTransportationTax ? ( */}
                  <select
                    className="input w-[210px]"
                    onChange={(e)=>settrasnportation_tax(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Select Tax
                    </option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                {/* ) : (
                  <input
                    type="text"
                    value={trasnportation_tax} className="input"
                    onChange={() =>
                      setshowTransportationTax(!showTransportationTax)
                    }
                  />
                )} */}
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Other Charges
                </label>
                <input
                  className="input w-[220px]"
                  type="text"
                  placeholder="Enter Other Charges"
                  value={other_charges}
                  onChange={(e)=>setother_charges(e.target.value)}
                />
              </div>

              <div className="flex flex-col p-2">
                <label htmlFor="" className="text-[12px]">
                  Tax
                </label>
                {/* {!showOtherTax ? ( */}
                  <select
                    className="input w-[210px]"
                    onChange={(e)=>setothers_tax(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      select Tax
                    </option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                {/* ) : (
                  <input
                    type="text"
                    value={others_tax}
                    onChange={() => setshowOtherTax(!showOtherTax)} className="input"
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Po_table */}
        <section className="w-full px-2 py-5">
          <div>
            <PoItemTable isSubmit={isSubmit} PoId={poId} userName={userName} />
          </div>

          {/* File inputs */}
          <section className="w-full">
            <AddDoc isSubmit={isSubmit} PO_Id={poId} userName={userName} />
          </section>
        </section>

        <div className="pt-4 pl-[10px]">
          <button
            type="button" onClick={handleSubmit}
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
