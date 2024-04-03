import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
function VendorEdit({ vender_id, onSubmit, editClose, userName }) {
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Vendor_Classification: "",
    Customer_Currency: "",
    Contact_Person_Name: "",
    Contact_Person_Phone_No: "",
    Contact_Person_Email: "",
    Vendor_Type: "",
    status: "",
    GSTN_Number: "",
    Pan_Number: "",
    Ecc_No: "",
    St_Reg_Number: "",
    Tin_No: "",
    Tan_Number: "",
    MSME_No: "",
    Payment_Terms: "",
    Inco_Terms: "",
    Bank_ACC_No: "",
    Bank_Branch: "",
    Bank_IFSC: "",
    Bank_Name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/vender/view/${vender_id}`
        );
        const vendorData = response.data;
        setFormData(vendorData);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value, // No need to capitalize field names
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time using Moment.js
    const current = moment().format('DD-MM-YYYY HH:mm:ss');


    // Update formData with updated date and time
    const updatedFormData = {
      ...formData,
      Updated_at: current,
      updatedBy: userName

    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/vender/edit/${vender_id}`,
        updatedFormData
      );
      console.log(response);
      alert("Data updated successfully!");
      setFormData("");
      onSubmit();
    } catch (error) {
      alert("Internal Server Error!");
      console.error("Error updating data:", error);
    }
  };


  const HandleClose = () => {
    editClose()
  };
  return (
    <section className="w-100 h-screen bg-white">
      <div className="flex px-5">
        <div className="w-[25%] py-1"></div>
        <div className="w-[50%] py-4">
          <h1 className="text-xl font-bold text-center px-5  tracking-wider uppercase">
            Edit Vender Vendor Details
          </h1>
        </div>
        <div className="w-[25%] flex justify-end py-2">
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
      <form onSubmit={handleSubmit} className="px-5">
        <h1 className="text-md tracking-wider font-bold pb-[0px]">
          General Information
        </h1>
        <div className="w-100">
          <div className="w-100">
            <input
              required
              type="text"
              value={formData.Name}
              onChange={(e) => handleChange(e, "Name")}
              className="input w-[293px] ml-0 m-2"
              placeholder="Vendor Name"
            />
            <input
              required
              className="input w-[500px]  m-2"
              placeholder="Address"
              type="text"
              value={formData.Address}
              onChange={(e) => handleChange(e, "Address")}
            />
          
            <select
              className="input m-2"
              onChange={(e) => handleChange(e, "status")}
              value={formData.status}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>

          <div>
            <input
              required
              className="input ml-0 m-2"
              placeholder="Contact Person Name"
              type="text"
              value={formData.Contact_Person_Name}
              onChange={(e) => handleChange(e, "Contact_Person_Name")}
            />
            <input
              required
              type="email"
              placeholder="Contact Person Email"
              value={formData.Contact_Person_Email}
              className="input m-2"
              onChange={(e) => handleChange(e, "Contact_Person_Email")}
            />
            <input
              required
              placeholder="Contact Person Phone No."
              className="input w-[200px] m-2"
              type="text"
              value={formData.Contact_Person_Phone_No}
              onChange={(e) => handleChange(e, "Contact_Person_Phone_No")}
            />

            <select
              className="input m-2"
              onChange={(e) => handleChange(e, "Vendor_Type")} value={formData.Vendor_Type}
            >
              <option value="" disabled selected hidden>
                Vendor Type
              </option>
              <option value="Domestic">Domestic</option>
              <option value="Regular">Regular</option>
            </select>

          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0px] pt-2">
              Registration Information
            </h1>
            <div>
              <input
                required
                type="text"
                value={formData.GSTN_Number}
                className="input ml-0 m-2"
                placeholder="GSTN Number"
                onChange={(e) => handleChange(e, "GSTN_Number")}
              />
              <input
                required
                type="text"
                className="input m-2"
                placeholder="Pan Number"
                value={formData.Pan_Number}
                onChange={(e) => handleChange(e, "Pan_Number")}
              />
              <input
                required
                placeholder="Ecc No"
                className="input m-2"
                type="text"
                value={formData.Ecc_No}
                onChange={(e) => handleChange(e, "Ecc_No")}
              />
              <input
                required
                className="input m-2"
                placeholder="St Reg Number"
                type="text"
                value={formData.St_Reg_Number}
                onChange={(e) => handleChange(e, "St_Reg_Number")}
              />
            </div>

            <div>
              <input
                required
                placeholder="Tin No"
                className="input w-[300px] m-2 ml-0"
                type="text"
                value={formData.Tin_No}
                onChange={(e) => handleChange(e, "Tin_No")}
              />
              <input
                required
                placeholder="Tan Number"
                className="input m-2"
                type="text"
                value={formData.Tan_Number}
                onChange={(e) => handleChange(e, "Tan_Number")}
              />
              <input
                required
                placeholder="MSME No"
                className="input m-2"
                type="text"
                value={formData.MSME_No}
                onChange={(e) => handleChange(e, "MSME_No")}
              />
            </div>
          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0] pt-2">
              Payment Information
            </h1>
            <div>
              <input
                required
                className="input w-[150px] ml-0 m-2"
                type="text"
                placeholder="Customer Currency"
                value={formData.Customer_Currency}
                onChange={(e) => handleChange(e, "Customer_Currency")}
              />

              <input
                required
                className="input m-2"
                placeholder="Payment Terms"
                type="text"
                value={formData.Payment_Terms}
                onChange={(e) => handleChange(e, "Payment_Terms")}
              />
              <input
                required
                type="text"
                placeholder="Inco Terms"
                className="input m-2"
                value={formData.Inco_Terms}
                onChange={(e) => handleChange(e, "Inco_Terms")}
              />
              <select
                required
                className="input w-[210px] m-2"
                onChange={(e) => handleChange(e, "Vendor_Classification")} value={formData.Vendor_Classification}
              >
                <option value="" disabled selected hidden>
                  Vendor Classification
                </option>
                <option value="Micro">Micro</option>
                <option value="Macro">Macro</option>
              </select>
            </div>
          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0px] pt-2">
              Bank Information
            </h1>
            <div>


              <input
                required
                placeholder="Bank Name"
                className="input w-[300px] m-2 ml-0"
                type="text"
                value={formData.Bank_Name}
                onChange={(e) => handleChange(e, "Bank_Name")}
              />
              <input
                required
                placeholder="Bank Branch"
                className="input w-[180px] m-2"
                type="text"
                value={formData.Bank_Branch}
                onChange={(e) => handleChange(e, "Bank_Branch")}
              />
              <input
                required
                placeholder="Bank IFSC"
                className="input  m-2"
                type="text"
                value={formData.Bank_IFSC}
                onChange={(e) => handleChange(e, "Bank_IFSC")}
              />
              <input
                required
                type="text"
                placeholder="Bank A\C No"
                className="input m-2"
                value={formData.Bank_ACC_No}
                onChange={(e) => handleChange(e, "Bank_ACC_No")}
              />
            </div>
          </div>
        </div>

        <div className="pt-2 ">
          <button
            type="submit"
            className="w-[120px] h-[40px] bg-gray-500 text-white text-lg font-bold capitalize rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default VendorEdit;
