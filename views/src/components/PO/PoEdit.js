import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import EditPoItemTable from "./EditPoItemTable";
import ViewDoc from "./ViewDoc";
import moment from "moment";

function EditPo({ onSubmit, PoId, userName }) {
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
    others_tax: ""
  });
  const [poItemData, setPoItemData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/Po/Po_combined",
          { PO_ID: PoId }
        );

        setPoData(response.data.PoData);
        setPoItemData(response.data.PoItemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [PoId]);

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

  const handleUpdatePo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/Po/updateAll/${PoId}`,
        updatedPoformData,poItemData
      );
      console.log(response.data);
    
      console.log("PO and PO items updated successfully");
    } catch (error) {
      console.error("Error updating PO and PO items:", error);
    }
  };

  const HandleClose = () => {
    onSubmit();
  };

  return (
    <section className="w-100 bg-white h-screen h-min-screen">
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

                <select value={poData.trasnportation_tax}     onChange={(e) => handleChange(e, "trasnportation_tax")}
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
          </div>
        </div>

        {/* Po_table */}
        <section className="w-full px-2 py-5">
          <div>
            <EditPoItemTable PoId={PoId} userName={userName} poItemData={poItemData} />
          </div>

          {/* File inputs */}
          <section className="w-full">
            <ViewDoc POId={PoId} />
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
